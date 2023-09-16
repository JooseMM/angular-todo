import { Component } from '@angular/core';
import { ListType } from './list-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  listValue: ListType[] = [];

  new: string | undefined;

  updateData = (newTask: string) => {
    this.listValue.push({
      id: new Date().getTime(),
      task: newTask,
      complete: false,
    });
  };
  deleteData = (data: Number) => {
    this.listValue = this.listValue.filter(
      (value: ListType) => value.id != data
    );
  };
}
