import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListType, RawJson, CreateResponse, UserLoggedIn, HttpGetTasks, HttpPostLogin } from './list-type';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataBase = new BehaviorSubject<ListType[]>([]);
  private userLoggedIn = new BehaviorSubject<boolean>(false);
  //subcription variable
  checkSessionSubcription?: Subscription;
  userLoggedInSubscription?: Subscription;
  fetchUserTaskSubscription?: Subscription;

  constructor(private http :HttpClient) {
    this.checkSessionSubcription = this.checkCurrentUserSession();
    this.userLoggedInSubscription = this.userLoggedIn.subscribe((loggedIn: boolean)=> {
      if(loggedIn){
        this.fetchUserTaskSubscription = this.fetchData();
      }
    });
  }

  checkCurrentUserSession = ():Subscription => {
    return this.http.get<UserLoggedIn>(`${environment.API_TEST}userLoggedIn`, { withCredentials: true })
      .subscribe((response:UserLoggedIn)=> {
        if(response.ok) {
          this.userLoggedIn.next(true);
        }
      });
  }

  fetchData = ():Subscription => {
    return this.http.get<HttpGetTasks>(`${environment.API_TEST}tasks`,{ withCredentials: true})
    .pipe(map((value: HttpGetTasks) => value.tasks)).subscribe((taskArray)=> {
      if(taskArray.length > 0) {
        this.sortByLatest(taskArray);
      }
    });
  }

  userLogin = (payload: HttpPostLogin) => {
    this.http.post<UserLoggedIn>(`${environment.API_TEST}login`, payload, { withCredentials: true})
        .subscribe((response: UserLoggedIn) => {
          if(response.ok) {
            this.userLoggedIn.next(true);
            console.log(response);
          } else {
            console.log(response);
          }
        });
  };

  getData = () => {
   return this.dataBase.asObservable();
  };

  setId = (tempID: string, ID: string):void => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.map((value): ListType => {
      if(value._id === tempID) {
        console.log(value._id, ID)
        return {
          _id: ID,
          task: value.task,
          date: value.date,
          complete: value.complete,
          showDetails: value.showDetails
        };
      }
      else return value;
    }));
  };
  addData = (newTask: string) => {
    const tempId = Date.now().toString();
    const nextValue = this.dataBase.value;
    nextValue.push({
      _id: tempId,
      task: newTask,
      date: new Date(),
      complete: false,
      showDetails: false,
    })
    this.sortByLatest(nextValue);
    this.http.post<CreateResponse>(environment.API_URL, { task: newTask, date: new Date()})
        .subscribe((response)=> this.setId(tempId, response.insertedId));
  };

  sortByLatest = (data: ListType[]):void => {
    let finishTask: ListType[] = [];
    let pendingTask: ListType[] = [];

    pendingTask = data
      .filter((match) => !match.complete)
      .sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });
    finishTask = data
      .filter((match) => match.complete)
      .sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });

    this.dataBase.next([...pendingTask, ...finishTask]);
  };

  deleteData = (deleteId: string):void => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.filter((value: ListType) =>  value._id != deleteId ));

    this.http.delete<RawJson[]>(`${environment.API_URL}delete/${deleteId}`)
      .pipe(
        map((value: RawJson[]) => value.map((prop: RawJson)=> ({
          _id: prop._id,
          task: prop.task,
          complete: prop.complete,
          date: prop.date,
          showDetails: false
        }))))
        .subscribe((response)=> console.log(response));

  };
  clearCompletes = ():void => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.filter((value: ListType) =>  !value.complete  ));

  }
  setShowDetails = (id: string):void => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.map((value): ListType => {
      if(value._id === id) {
        return {
          _id: value._id,
          task: value.task,
          date: value.date,
          complete: value.complete,
          showDetails: !value.showDetails
        };
      }
      else return value;
    }));
  };
  completedTask = (id: string):void => {
    const updateState = this.dataBase.value;
    this.sortByLatest(updateState.map((value): ListType => {
      if(value._id === id) {
        return {
          _id: value._id,
          task: value.task,
          date: value.date,
          complete: true,
          showDetails: !value.showDetails
        };
      }
      else { return value; }
    }));
    this.http.put(environment.API_URL, { id: id, task: undefined, complete: true })
    .subscribe((reponse)=> console.log(reponse));

  };
  cleanUp = ():void => {
    if(this.checkSessionSubcription)
    this.checkSessionSubcription.unsubscribe();
  }
}
