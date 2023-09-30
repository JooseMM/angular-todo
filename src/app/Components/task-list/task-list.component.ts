import { Component, inject } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  list: ListType[] = [];
  dataService: DataService = inject(DataService);

  deleteTask = (id: Number) => {
    this.dataService.deleteData(id);
    this.list = this.dataService.getAllData();
  };

  constructor() {
    this.list = this.dataService.getAllData();
  }
}

// @Input() list: ListType[] = [];
// @Output() newTask = new EventEmitter<string>();
// @Output() deleteTaskId = new EventEmitter<Number>();
