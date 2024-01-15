import { Injectable } from '@angular/core';
import { ListType } from './list-type';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataBase = new BehaviorSubject<ListType[]>([]);
  constructor() {}

  getData = () => {
    return this.dataBase.pipe(map((v) => v));
  };

  addData = (newTask: string) => {
    let updateDataBase: ListType[] = [];
    this.getData().subscribe((data) => (updateDataBase = [...data]));

    updateDataBase.push({
      id: new Date().getTime(),
      task: newTask,
      complete: false,
      showDetails: false,
    });
    this.sortByLatest(updateDataBase);
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

  deleteData = (id: Number) => {
    let updateDataBase: ListType[] = [];
    this.getData().subscribe((value) => (updateDataBase = [...value]));

    this.dataBase.next(
      updateDataBase.filter((value: ListType) => value.id != id)
    );
  };
  setShowDetails = (id: Number) => {
    let updateData: ListType[] = [];
    this.getData().subscribe((value) => (updateData = [...value]));

    updateData = updateData.map((value) => {
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

    this.dataBase.next(updateData);
  };
  completedTask = (id: number) => {
    let updateData = this.dataBase.getValue();
    updateData = updateData.map((value) => {
      if (value.id === id) {
        return {
          id: value.id,
          task: value.task,
          complete: true,
          showDetails: false,
        };
      } else {
        return value;
      }
    });
    this.sortByLatest(updateData);
  };
}
