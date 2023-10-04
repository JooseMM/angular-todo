import { Component, Input } from '@angular/core';
import { ListType } from 'src/app/list-type';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() item!: ListType;
  @Input() id!: number;
  showDetails: boolean = false;

  toggleDiv = () => {
    this.showDetails = !this.showDetails;
  };
}
