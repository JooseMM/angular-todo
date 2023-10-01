import { Component, inject } from '@angular/core';
import { ListType } from '../../list-type';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-task-list',
  template: `<ul class="bg-white pt-10 space-y-4">
      <li
        *ngFor="let item of list; let i = index"
        class="py-4 px-6 mx-auto flex items-center bg-soft-gray rounded-md w-11/12 text-dark-blue"
      >
        <span class="text-very-dark-blue font-black text-3xl mr-6"
          >#{{ i + 1 }}</span
        >
        <div class="flex justify-between items-center basis-full">
          <span class="truncate max-w-[150px]">{{ item.task }}</span>
          <button class="btn-delete">
            <img
              src="../../../assets/Icons/task-list-detail-btn.svg"
              alt="more datails"
              (click)="toggleView()"
            />
          </button>
          <div [hidden]="showDetails">Hey!</div>
        </div>
      </li>
    </ul>
    <!-- (click)="deleteTask(item.id)" -->`,
})
export class TaskListComponent {
  list: ListType[] = [];
  dataService: DataService = inject(DataService);

  public showDetails: boolean = true;

  toggleView = () => {
    this.showDetails = !this.showDetails;
  };

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
