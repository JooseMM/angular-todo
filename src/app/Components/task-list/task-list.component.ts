import { Component, OnDestroy } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnDestroy{
  list: ListType[] = [];
  subscription: Subscription;

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
    this.subscription = this.dataService.getData()
    .subscribe((value: ListType[]) => this.list = value );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dataService.cleanUp();
  }
}
