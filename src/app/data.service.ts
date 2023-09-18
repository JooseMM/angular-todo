import { Injectable } from '@angular/core';
import { ListType } from './list-type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  protected dataBase: ListType[] = [
    {
      id: new Date().getTime(),
      task: 'something',
      complete: false,
    },
  ];
  constructor() {}

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
