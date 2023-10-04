import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `<h1 #show>Hey!</h1>
    <button (click)="doSomething(show)">Click</button>`,
})
export class AboutComponent {
  doSomething(show: any) {
    show.class = 'text-xl';
    console.log(show.class);
  }
}
