import { Component } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  list: ListType[] = [];

  deleteItem = (id: Date) => {
    this.dataService.deleteData(id);
  };
  complete = (id: Date) => {
    this.dataService.completedTask(id);
  };
  showMore = (id: Date) => {
    this.dataService.setShowDetails(id);
  };
  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((value: ListType[]) => {
      this.list = value;
    });
  }
}
