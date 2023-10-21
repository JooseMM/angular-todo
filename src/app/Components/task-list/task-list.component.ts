import { Component, inject } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-task-list',
  template: ` <div class="bg-white ">
    <ul
      class="bg-white py-8  pb-4 grid grid-cols-1 w-[90%] gap-y-4 mx-auto |  md:grid-cols-2 md:gap-x-5 md:py-16 | lg:max-w-5xl lg:gap-x-8 lg:gap-y-5"
    >
      <app-task-item
        class="flex bg-soft-gray rounded-md |  | lg:mx-0 lg:w-full  lg:items-center"
        [class.md:h-28]="!listItem.showDetails"
        *ngFor="let listItem of list; let i = index"
        [item]="listItem"
        [index]="i"
      ></app-task-item>
    </ul>
  </div>`,
})
export class TaskListComponent {
  list: ListType[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((value) => {
      this.list = value;
    });
  }
}