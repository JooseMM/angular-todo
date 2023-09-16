import { Component, inject } from '@angular/core';
import { ListType } from './list-type';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  listValue: ListType[] = [];
  dataService: DataService = inject(DataService);
  new: string | undefined;

  constructor() {
    this.listValue = this.dataService.getAllData();
  }
}
