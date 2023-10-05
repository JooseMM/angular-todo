import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListType } from 'src/app/list-type';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() item!: ListType;
  @Input() index!: number;
  showDetails: boolean = false;
  @Output() taskID = new EventEmitter<number>();

  logic = (): string => {
    let completedTaskClass: string = 'opacity-50';
    if (this.item.complete) {
      return 'mt-2';
    } else {
      return 'truncate max-w-[150px]';
    }
  };

  toggleDiv = () => {
    this.showDetails = !this.showDetails;
  };

  targetTask = (id: number) => {
    this.taskID.emit(id);
  };
}
