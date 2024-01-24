import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `<app-navbar></app-navbar><router-outlet></router-outlet
    ><app-footer></app-footer>`
})
export class AppComponent {
  notificationSubscription: Subscription;
  constructor(private dataServe: DataService){
    this.notificationSubscription = dataServe.getNotifications().subscribe((message: string)=>{
     if(message != '') { console.log("Notification: " + message); }
    });
  }
}
