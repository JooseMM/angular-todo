import { Injectable } from '@angular/core';
import { ListType } from './list-type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  protected dataBase: ListType[] = [];
  constructor() {}

  submit(newTask: string) {
    console.log(newTask);
  }

  getAllData(): ListType[] {
    this.sortByLatest();
    return this.dataBase;
  }
  addData = (newTask: string) => {
    this.dataBase.push({
      id: new Date().getTime(),
      task: newTask,
      complete: false,
      showDetails: false,
    });
  };

  sortByLatest = () => {
    let completeTaskArray = this.dataBase
      .filter((obj) => obj.complete)
      .sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
    let pendingTaskArray = this.dataBase
      .filter((obj) => !obj.complete)
      .sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });

    this.dataBase = [...pendingTaskArray, ...completeTaskArray];
  };

  deleteData = (id: Number) => {
    this.dataBase = this.dataBase.filter((value: ListType) => value.id != id);
  };
  setShowDetails = (id: Number) => {
    //make this cleaner
    let newArray: ListType[] = this.dataBase.map((value) => {
      if (value.id === id) {
        return {
          id: value.id,
          task: value.task,
          complete: value.complete,
          showDetails: !value.showDetails,
        };
      } else {
        return {
          id: value.id,
          task: value.task,
          complete: value.complete,
          showDetails: false,
        };
      }
    });
    this.dataBase = [...newArray];
  };
  completedTask = (id: number) => {
    //make this cleaner
    let newArray: ListType[] = this.dataBase.map((value) => {
      if (value.id === id) {
        return {
          id: value.id,
          task: value.task,
          complete: true,
          showDetails: false,
        };
      } else {
        return {
          id: value.id,
          task: value.task,
          complete: value.complete,
          showDetails: value.showDetails,
        };
      }
    });
    this.dataBase = [...newArray];
  };
}
