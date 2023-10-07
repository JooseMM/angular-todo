import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListType } from 'src/app/list-type';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() item!: ListType;
  @Input() index!: number;
  @Input() showDetails: boolean = false;
  @Output() taskAction = new EventEmitter<{ id: number; action: string }>();
  @Output() muoseOn = new EventEmitter<boolean>();

  toggleDiv = () => {
    this.showDetails = !this.showDetails;
    this.muoseOn.emit(this.showDetails);
  };

  targetTask = (id: number, action: string) => {
    let task = { id, action };
    this.taskAction.emit(task);
  };
}
