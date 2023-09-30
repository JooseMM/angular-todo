import { Component, inject } from '@angular/core';
import { ListType } from '../list-type';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task-form',
  templateUrl: 'task-form.component.html',
})
export class TaskFormComponent {
  list: ListType[] = [];
  dataService: DataService = inject(DataService);

  addNewTask = (task: string) => {
    this.dataService.addData(task);
    this.list = this.dataService.getAllData();
  };
  preventDefault = (event: Event) => {
    event.preventDefault();
  };
}
