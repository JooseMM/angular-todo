import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListType } from 'src/app/list-type';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() item!: ListType;
  @Input() index!: number;
  @Output() taskAction = new EventEmitter<{ id: number; action: string }>();
  @Output() selectedTask = new EventEmitter<number>();

  expandTaskEvent = (id: number) => {
    this.selectedTask.emit(id);
  };

  targetTask = (id: number, action: string) => {
    let task = { id, action };
    this.taskAction.emit(task);
  };
}
