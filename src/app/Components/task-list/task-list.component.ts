import { Component, OnDestroy } from '@angular/core';
import { Task } from '../../list-type';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnDestroy{
  list: Task[] = [];
  dataSubscription: Subscription;

  clearComplete = ():void => {
    this.dataService.clearCompletes();
  }
  getSpanishDate = ():string => {
    const date = new Date();
    const formattedDate = date.toLocaleString('es', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
    const charToUppercase = formattedDate.at(0)!.toUpperCase();
    return charToUppercase.concat(formattedDate.slice(1));
  }
  deleteItem = (id: string) => {
    this.dataService.deleteData(id);
  };
  complete = (id: string) => {
    this.dataService.completedTask(id);
  };
  showMore = (id: string) => {
    this.dataService.setShowDetails(id);
  };
  constructor(private dataService: DataService) {
    this.dataSubscription = this.dataService.getData()
    .subscribe((value: Task[]) => this.list = value  );
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.dataService.cleanUp();
  }
}
