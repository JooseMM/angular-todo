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
        (selectedTask)="handleExpandTask($event)"
        (taskAction)="taskStateChange($event)"
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

  taskStateChange = (task: { id: number; action: string }) => {
    if (task.action === 'completed') {
      this.dataService.completedTask(task.id);
    } else if (task.action === 'delete') {
      console.log('Delete!');
      this.dataService.deleteData(task.id);
    }
    this.list = this.dataService.getAllData();
  };
  handleExpandTask = (taskID: number) => {
    this.selectedTaskID = taskID;
    this.dataService.setShowDetails(taskID);
    this.list = this.dataService.getAllData();
  };
}
// [ngClass]="
//           listItem.showDetails && (i + 1) % 3 != 0 ? 'lg:col-span-2' : null
//         "