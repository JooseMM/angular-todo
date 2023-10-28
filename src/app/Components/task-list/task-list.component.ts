import { Component, inject } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  list: ListType[] = [];

  deleteItem = (id: number) => {
    this.dataService.deleteData(id);
  };
  complete = (id: number) => {
    this.dataService.completedTask(id);
  };
  showMore = (id: number) => {
    this.dataService.setShowDetails(id);
  };
  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((value) => {
      this.list = value;
    });
  }
}