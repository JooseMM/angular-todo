import { Component, inject } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-task-list',
  template: ` <div class="bg-white ">
    <ul
      class="bg-white pt-8 pb-4 | lg:grid lg:grid-cols-3 lg:pt-20 lg:mx-auto lg:max-w-5xl lg:gap-x-8  "
    >
      <app-task-item
        *ngFor="let listItem of list; let i = index"
        [class]="hoverIteraction(i + 1)"
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

  hoverIteraction = (index: number) => {
    let baseClass: string =
      'mb-6 py-4 px-6 mx-auto bg-soft-gray rounded-md w-[90%] text-dark-blue |  lg:mx-0 lg:py-0 lg:w-full lg:items-center';
    let lastItemRowClass: string = 'lg:hover:col-start-2 lg:hover:col-span-2';

    let fixRowClass: number = Math.trunc((index + 3) / 3);
    console.log(fixRowClass.toString());

    if ((index + 1) % 3 === 0) {
      return `${baseClass} ${lastItemRowClass}`;
    } else {
      return `${baseClass} lg:hover:col-span-2`;
    }
  };

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
// [class.lg:hover:col-start-2]="(i + 1) % 3 === 0" // here we use the remainder to assign the class only if i is dividable by 3 since every row will end with a third box in it
// value + 3  = result / 3 = row