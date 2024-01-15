import { Injectable } from '@angular/core';
import { ListType } from './list-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataBase;
  constructor() {
    this.dataBase = new BehaviorSubject<ListType[]>([]);
  }

  getData = () => {
    return this.dataBase.asObservable();
  };

  addData = (newTask: string) => {
    const nextValue = this.dataBase.value;
    nextValue.push({
      id: new Date(),
      task: newTask,
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

  deleteData = (id: Date) => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.filter((value: ListType) => value.id != id));

  };
  setShowDetails = (id: Date) => {
    const nextValue = this.dataBase.value;
    this.dataBase.next(nextValue.map((value): ListType => {
      if(value.id === id) {
        return {
          id: value.id,
          task: value.task,
          complete: value.complete,
          showDetails: !value.showDetails
        };
      }
      else return value;
    }));
  };
  completedTask = (id: Date) => {
    const updateState = this.dataBase.value;
    this.sortByLatest(updateState.map((value): ListType => {
      if(value.id === id) {
          return {
          id: value.id,
          task: value.task,
          complete: true,
          showDetails: !value.showDetails
          };
      }
      else { return value; }
    }))
  };
}
