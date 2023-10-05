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
      complete: true,
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
  deleteData = (data: Number) => {
    this.dataBase = this.dataBase.filter((value: ListType) => value.id != data);
  };
}
