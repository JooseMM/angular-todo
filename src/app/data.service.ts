import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListType, rawjson, CreateResponse, task } from './list-type';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataBase = new BehaviorSubject<ListType[]>([]);
  subscription : Subscription;
  constructor(private http :HttpClient) {
    this.subscription = this.fetchData().subscribe((value:ListType[]) => this.sortByLatest(value));
  }

  fetchData = ():Observable<ListType[]> => {
    console.log("Execute!");
    return this.http.get<rawjson[]>(environment.API_URL)
    .pipe(
      map((value: rawjson[]) => value.map((prop: rawjson)=> ({
        _id: prop._id,
         task: prop.task,
         complete: prop.complete,
         date: prop.date,
         showDetails: false
       }))))
  }
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

      this.subscription = this.http.delete<rawjson[]>(`${environment.API_URL}delete/${deleteId}`)
      .pipe(
        map((value: rawjson[]) => value.map((prop: rawjson)=> ({
          _id: prop._id,
          task: prop.task,
          complete: prop.complete,
          date: prop.date,
          showDetails: false
        }))))
        .subscribe((response)=> console.log(response));

  };
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
    this.subscription = this.http.put(environment.API_URL, { id: id, task: undefined, complete: true })
    .subscribe((reponse)=> console.log(reponse));

  };
  cleanUp = ():void => {
    this.subscription.unsubscribe();
  }
}
