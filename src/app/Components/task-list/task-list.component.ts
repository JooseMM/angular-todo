import { Component, inject } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  template: ` <div class="bg-white ">
    <ul
      class="bg-white pt-8 pb-4 | lg:grid lg:grid-cols-3 lg:pt-20 lg:mx-auto lg:max-w-5xl lg:gap-x-8  "
    >
      <app-task-item
        class="mb-6 py-4 px-6 mx-auto bg-soft-gray rounded-md w-[90%] text-dark-blue |  lg:mx-0 lg:py-0 lg:w-full lg:items-center lg:hover:col-span-2"
        *ngFor="let listItem of list; let i = index"
        [class.lg:hover:col-start-2]="i === 2 && 5"
        [class.lg:hover:row-start-1]="i === 2"
        [class.lg:hover:row-start-2]="i === 5"
        [item]="listItem"
        [index]="i"
        (taskAction)="taskStateChange($event)"
      ></app-task-item>
    </ul>
  </div>`,
})
export class TaskListComponent {
  list: ListType[] = [];
  dataService: DataService = inject(DataService);
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
}
