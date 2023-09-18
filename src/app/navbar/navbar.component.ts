import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="bg-light-blue flex justify-between px-8 pt-10 pb-8">
      <span *ngIf="menuOpen == false" class="font-bold text-very-dark-blue"
        >Todo App</span
      >
      <ul *ngIf="menuOpen" class="flex gap-14 text-very-dark-blue">
        <li>
          <a
            routerLink="/"
            routerLinkActive="font-bold"
            class="active:font-bold"
            >Home</a
          >
        </li>
        <li>
          <a routerLink="/application" routerLinkActive="font-bold">App</a>
        </li>
        <li>
          <a routerLink="/advices" routerLinkActive="font-bold">About</a>
        </li>
      </ul>
      <button (click)="mobileMenuToggle()">
        <img
          [src]="menuIconSrc"
          alt="hamburguer menu"
          [class]="menuIconClass"
        />
      </button>
    </nav>
  `,
})
export class NavbarComponent {
  menuOpen: boolean = false;
  menuIconSrc: string = '../../assets/Icons/menu-icon.svg';
  menuIconClass: string = 'w-8';

  mobileMenuToggle = () => {
    this.menuOpen = !this.menuOpen;
    this.menuIconSrc = this.menuOpen
      ? '../../assets/Icons/menu-icon-close.svg'
      : '../../assets/Icons/menu-icon.svg';
    this.menuIconClass = this.menuOpen ? 'w-6 h-6' : 'w-8';
  };
}
