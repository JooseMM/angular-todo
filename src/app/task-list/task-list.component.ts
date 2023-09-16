import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListType } from '../list-type';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() list: ListType[] = [];
  @Output() newTask = new EventEmitter<string>();
  @Output() deleteTaskId = new EventEmitter<Number>();
  addNewTask = (task: string) => {
    this.newTask.emit(task);
  };
  deleteTask = (id: Number) => {
    this.deleteTaskId.emit(id);
  };
}
