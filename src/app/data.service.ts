import { Injectable } from '@angular/core';
import { ListType } from './list-type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  protected dataBase: ListType[] = [
    {
      id: new Date().getTime() + 10,
      task: 'Clean the house and take out the trash ',
      complete: false,
      showDetails: false,
    },
    {
      id: new Date().getTime() + 20,
      task: 'Get a goth thick babe, nigga damn!',
      complete: false,
      showDetails: false,
    },
    {
      id: new Date().getTime() + 50,
      task: 'Get a goth thick',
      complete: false,
      showDetails: false,
    },
    {
      id: new Date().getTime() + 100,
      task: 'Clean the house and take out the trash',
      complete: false,
      showDetails: false,
    },
    {
      id: new Date().getTime() + 75,
      task: 'Get a goth thick babe, nigga damn!',
      complete: false,
      showDetails: false,
    },
    {
      id: new Date().getTime() + 60,
      task: 'Get a goth thick babe, nigga damn!',
      complete: false,
      showDetails: false,
    },
  ];
  constructor() {}

  submit(newTask: string) {
    console.log(newTask);
  }

  getAllData(): ListType[] {
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
  deleteData = (id: Number) => {
    this.dataBase = this.dataBase.filter((value: ListType) => value.id != id);
  };
  setShowDetails = (id: Number) => {
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
