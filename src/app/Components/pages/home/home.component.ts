import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  response = '';
  constructor(private dataService: DataService){
     this.dataService.getNotifications()
     .subscribe((res)=> this.response = res);

  }
}
