import { Injectable } from '@angular/core';
import { ListType } from './list-type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  protected dataBase: ListType[] = [
    {
      id: new Date().getTime() + 5,
      task: 'Clean the house and take out the trash',
      complete: false,
    },
    {
      id: new Date().getTime(),
      task: 'Get a goth thick babe, nigga damn!',
      complete: false,
    },
    {
      id: new Date().getTime(),
      task: 'Get a goth thick babe, nigga damn!',
      complete: false,
    },
    {
      id: new Date().getTime(),
      task: 'Get a goth thick babe, nigga damn!',
      complete: false,
    },
    {
      id: new Date().getTime(),
      task: 'Get a goth thick babe, nigga damn!',
      complete: false,
    },
    {
      id: new Date().getTime(),
      task: 'Get a goth thick babe, nigga damn!',
      complete: false,
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
    });
  };
  deleteData = (id: Number) => {
    this.dataBase = this.dataBase.filter((value: ListType) => value.id != id);
  };
  completedTask = (id: number) => {
    // let newArray : ListType = this.dataBase.map((value: ListType) => {
    //   if (id === value.id) {
    //     return (value.complete = true);
    //   } else {
    //     return value;
    //   }
    // });

    let newArray: ListType[] = this.dataBase.map((value) => {
      if (value.id === id) {
        return { id: value.id, task: value.task, complete: true };
      } else {
        return { id: value.id, task: value.task, complete: value.complete };
      }
    });
    this.dataBase = [...newArray];
  };
}
