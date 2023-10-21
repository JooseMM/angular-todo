import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ListType } from 'src/app/list-type';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() item!: ListType;
  @Input() index!: number;

  constructor(private dataService: DataService) {}

  deleteItem = (id: number) => {
    this.dataService.deleteData(id);
  };
  complete = (id: number) => {
    this.dataService.completedTask(id);
  };
  showMore = (id: number) => {
    this.dataService.setShowDetails(id);
  };
}
