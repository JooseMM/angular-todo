import { Component, inject } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  template: `<ul class="bg-white pt-8 pb-2">
    <app-task-item
      *ngFor="let listItem of list; let i = index"
      [item]="listItem"
      [index]="i"
      (taskID)="deleteTask($event)"
    ></app-task-item>
  </ul>`,
})
export class TaskListComponent {
  list: ListType[] = [];
  dataService: DataService = inject(DataService);

  constructor() {
    this.list = this.dataService.getAllData();
  }
  deleteTask = (id: Number) => {
    console.log('this is click!');
    this.dataService.deleteData(id);
    this.list = this.dataService.getAllData();
  };
}

// @Input() list: ListType[] = [];
// @Output() newTask = new EventEmitter<string>();
// @Output() deleteTaskId = new EventEmitter<Number>();
