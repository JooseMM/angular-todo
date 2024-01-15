import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListType, rawjson } from './list-type';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataBase = new BehaviorSubject<ListType[]>([]);
  //private subscription
  constructor(private http :HttpClient) {
    this.http.get<rawjson[]>(environment.API_URL)
    .pipe(
      map((value: rawjson[]) => value.map((prop: rawjson)=>
       ({
        _id: prop._id,
         task: prop.task,
         complete: prop.complete,
         date: prop.date,
         showDetails: false
       })))
   ).subscribe((value:ListType[]) => this.dataBase.next(value));
  }

  getData = () => {
    return this.dataBase.asObservable();
  };

  addData = (newTask: string) => {
    const nextValue = this.dataBase.value;
    nextValue.push({
      _id: '',
      task: newTask,
      date: new Date(),
      complete: false,
      showDetails: false,
    })
    this.sortByLatest(nextValue);
  };

  sortByLatest = (data: ListType[]) => {
    let finishTask: ListType[] = [];
    let pendingTask: ListType[] = [];

    finishTask = data
      .filter((match) => match.complete)
      .sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
    pendingTask = data
      .filter((match) => !match.complete)
      .sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });

    console.log([...pendingTask, ...finishTask]);
    this.dataBase.next([...pendingTask, ...finishTask]);
  };

  deleteData = (id: string) => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.filter((value: ListType) => value._id != id));

  };
  setShowDetails = (id: string) => {
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
  completedTask = (id: string) => {
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
    }))
  };
}
