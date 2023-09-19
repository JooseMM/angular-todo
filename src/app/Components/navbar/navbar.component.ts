import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav
      class="bg-light-blue flex justify-between px-8 pt-10 pb-8 | md:px-desktop-page-padding"
    >
      <a
        *ngIf="menuOpen == false"
        class="font-bold text-very-dark-blue"
        routerLink="/"
      >
        Todo App
      </a>

      <!-- Mobile navigation menu -->

      <ul *ngIf="menuOpen" class="flex gap-14 text-very-dark-blue | md:hidden">
        <li>
          <a
            routerLink="/"
            routerLinkActive="font-bold"
            (click)="mobileMenuToggle()"
            >Home</a
          >
        </li>
        <li>
          <a
            routerLink="/application"
            routerLinkActive="font-bold"
            (click)="mobileMenuToggle()"
            >App</a
          >
        </li>
        <li>
          <a
            routerLink="/advices"
            routerLinkActive="font-bold"
            (click)="mobileMenuToggle()"
            >About</a
          >
        </li>
      </ul>
      <button (click)="mobileMenuToggle()">
        <img
          [src]="menuIconSrc"
          alt="hamburguer menu"
          [class]="menuIconClass"
        />
      </button>

      <!-- Desktop navigation menu -->

      <ul class="hidden md:flex gap-14 text-very-dark-blue/70">
        <li>
          <a
            class="hover:text-very-dark-blue/100"
            routerLink="/"
            routerLinkActive="font-bold text-very-dark-blue/100"
            >Home</a
          >
        </li>
        <li>
          <a
            class="hover:text-very-dark-blue/100"
            routerLink="/application"
            routerLinkActive="font-bold text-very-dark-blue/100"
            >App</a
          >
        </li>
        <li>
          <a
            class="hover:text-very-dark-blue/100"
            routerLink="/advices"
            routerLinkActive="font-bold text-very-dark-blue/100"
            >About</a
          >
        </li>
      </ul>
    </nav>
  `,
})
export class NavbarComponent {
  menuOpen: boolean = false;
  menuIconSrc: string = '../../assets/Icons/menu-icon.svg';
  menuIconClass: string = 'w-8 h-6 md:hidden';

  mobileMenuToggle = () => {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.menuIconSrc = '../../assets/Icons/menu-icon-close.svg';
      this.menuIconClass = 'w-8 h-6 md:hidden';
    } else {
      this.menuIconSrc = '../../assets/Icons/menu-icon.svg';
      this.menuIconClass = 'w-8 h-6 md:hidden';
    }
  };
}
