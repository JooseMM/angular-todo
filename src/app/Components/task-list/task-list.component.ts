import { Component, inject } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';
import { NgForOfContext } from '@angular/common';

@Component({
  selector: 'app-task-list',
  template: ` <div class="bg-white ">
    <ul
      class="bg-white pt-8 pb-4 | lg:grid lg:grid-cols-3 lg:pt-20 lg:mx-auto lg:max-w-5xl lg:gap-x-8 lg:gap-y-5"
    >
      <app-task-item
        *ngFor="let listItem of list; let i = index"
        [item]="listItem"
        [index]="i"
        (taskAction)="taskStateChange($event)"
        (expandTask)="getSelectedTask($event)"
        [ngClass]="selectedTaskID === i ? 'text-white' : ''"
      ></app-task-item>
    </ul>
  </div>`,
})
export class TaskListComponent {
  list: ListType[] = [];
  dataService: DataService = inject(DataService);
  selectedTaskID: number | undefined;
  constructor() {
    this.list = this.dataService.getAllData();
  }

  taskStateChange = (task: any) => {
    if (task.action === 'completed') {
      this.dataService.completedTask(task.id);
    } else if (task.action === 'delete') {
      console.log('Delete!');
      this.dataService.deleteData(task.id);
    }
    this.list = this.dataService.getAllData();
  };
  getSelectedTask = (index: any) => {
    this.selectedTaskID = index;
    console.log(`Parent ${index}`);
  };
}
