import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, CreateResponse, UserLoggedIn, HttpGetTasks, HttpPostLogin, ModifiedResponse } from './list-type';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataBase = new BehaviorSubject<Task[]>([]);
  private userLoggedIn = new BehaviorSubject<boolean>(false);
  private notifications = new BehaviorSubject<string>('');
  //subcription variable
  checkSessionSubcription?: Subscription;
  userLoggedInSubscription?: Subscription;
  fetchUserTaskSubscription?: Subscription;
  userActionsSubscription?: Subscription;

  constructor(private http :HttpClient) {
    this.checkSessionSubcription = this.checkCurrentUserSession();
    this.userLoggedInSubscription = this.userLoggedIn.subscribe((loggedIn: boolean)=> {
      if(loggedIn){
        this.fetchUserTaskSubscription = this.fetchData();
      }
    });
  }
  getData = ():Observable<Task[]> => {
   return this.dataBase.asObservable();
  };
  getNotifications = ():Observable<string> => {
    return this.notifications.asObservable();
  }
  getCurrentUser = ():Observable<boolean> => {
    return this.userLoggedIn.asObservable();
  }
  checkCurrentUserSession = ():Subscription => {
    return this.http.get<UserLoggedIn>(`${environment.API_URL}userLoggedIn`, { withCredentials: true })
      .subscribe((response:UserLoggedIn)=> {
          this.userLoggedIn.next(response.userLoggedIn);
      });
  }
  fetchData = ():Subscription => {
    return this.http.get<HttpGetTasks>(`${environment.API_URL}tasks`,{ withCredentials: true})
    .pipe(map((value: HttpGetTasks) => value.tasks)).subscribe((taskArray:Task[])=> {
      if(taskArray.length > 0) {
        this.sortByLatest(taskArray);
      }
    });
  }
  userLogin = (payload: HttpPostLogin) => {
    this.http.post<UserLoggedIn>(`${environment.API_URL}login`, payload, { withCredentials: true})
        .subscribe({
          next: (response: UserLoggedIn) => {
          if(response.userLoggedIn) {
          this.userLoggedIn.next(true);
          this.notifications.next(`Bienvenido, ${response.user}`);
          return;
        }
        this.notifications.next('Operacion fallida, credenciales incorrectas');
          },
          error: () => {
        this.notifications.next('Operacion fallida, problemas de conexion con servidor');
          }
        });
  };
  userLogout = () => {
    const currentTime = new Date().getTime();
    const headers = new HttpHeaders ({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    this.http.post<UserLoggedIn>(`${environment.API_URL}logout/${currentTime}`, { headers: headers, withCredentials: true})
      .subscribe({
        next: (response: UserLoggedIn) => {
          if(response.ok) {
            this.userLoggedIn.next(false);
            this.notifications.next("Usuario cerro sesion exitosamente");
            this.dataBase.next([]);
          }
        },
        error: () => {
          this.notifications.next("Operacion fallida, razon desconocida");
        }

      });
  };
  setId = (tempID: string, ID: string):void => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.map((value): Task => {
      if(value._id === tempID) {
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
    if(this.userLoggedIn.value) {
      const payload = { task: newTask, date: new Date()};
      this.userActionsSubscription = this.http.post<CreateResponse>(`${environment.API_URL}task`, payload, { withCredentials: true })
      .subscribe((response)=> {
        if(response.ok){
          this.setId(tempId, response.insertedId)
          this.notifications.next(`Operacion exitosa: ${response.modifiedCount} tarea creada.`);
        } else {
          this.notifications.next(`Operacion fallida: Codigo ${response.msg}`);
        }
      });
    }
  };

  sortByLatest = (data: Task[]):void => {
    let finishTask: Task[] = [];
    let pendingTask: Task[] = [];

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
    this.dataBase.next(nextValue.filter((value: Task) =>  value._id != deleteId ));

    if(this.userLoggedIn.value) {
      this.userActionsSubscription = this.http.delete<ModifiedResponse>(`${environment.API_URL}delete/${deleteId}`, { withCredentials: true })
      .subscribe((response: ModifiedResponse)=> {
          if(response.ok) {
            this.notifications.next(`Operacion exitosa: ${response.modifiedCount} tarea eliminada.`);
          } else {
            this.notifications.next(`Operacion fallida: Codigo ${response.status}`);
          }
      })
    }
  };
  clearCompletes = ():void => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.filter((value: Task) =>  !value.complete  ));
    if(this.userLoggedIn.value) {
      this.userActionsSubscription = this.http.delete<ModifiedResponse>(`${environment.API_URL}delete/complete`, { withCredentials: true })
        .subscribe((response: ModifiedResponse)=>{
          if(response.ok){
            this.notifications.next(`Operacion exitosa: ${response.modifiedCount} tarea/s eliminada/s.`);
          } else {
            this.notifications.next(`Operacion fallida: Codigo ${response.status}`);
          }
        })
    }
  }
  setShowDetails = (id: string):void => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.map((value): Task => {
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
    this.sortByLatest(updateState.map((value): Task => {
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
    if(this.userLoggedIn.value) {
      const payload = { id: id, task: undefined, complete: true };
      this.userActionsSubscription = this.http.put<ModifiedResponse>(`${environment.API_URL}task`, payload, { withCredentials: true })
      .subscribe((response: ModifiedResponse)=> {
        if(response.ok){
          this.notifications.next(`Operacion exitosa: ${response.modifiedCount} tarea completada.`);
        } else {
          this.notifications.next(`Operacion fallida: Code ${response.status}`);
        }
      });
    }

  };
  cleanUp = ():void => {
    if(this.checkSessionSubcription) { this.checkSessionSubcription.unsubscribe(); }
    if(this.userActionsSubscription) { this.userActionsSubscription.unsubscribe(); }
    if(this.fetchUserTaskSubscription) { this.fetchUserTaskSubscription.unsubscribe(); }
    if(this.userLoggedInSubscription) { this.userLoggedInSubscription.unsubscribe(); }
  }
}
