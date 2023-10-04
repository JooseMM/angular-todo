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
        [id]="i"
      ></app-task-item>
    </ul>
    <!-- (click)="deleteTask(item.id)" -->`,
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
