import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav
      class="my-10 w-[90%] mx-auto flex justify-between | md:w-auto md:mx-desktop-margin "
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
            routerLink="/home"
            routerLinkActive="font-bold"
            (click)="mobileMenuToggle()"
            >Inicio</a
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
            routerLink="/about"
            routerLinkActive="font-bold"
            (click)="mobileMenuToggle()"
            >Nosotros</a
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
            routerLink="/home"
            routerLinkActive="font-bold text-very-dark-blue/100"
            >Inicio</a
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
            routerLink="/about"
            routerLinkActive="font-bold text-very-dark-blue/100"
            >Nosotros</a
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

  constructor(public router: Router) {}

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

// [ngClass]="
// this.router.routerState.snapshot.url === '/about'
//   ? 'bg-black'
//   : 'bg-red'
// "
// this.router.events.subscribe((event) => {
//   if (event instanceof NavigationEnd && this.router.url === '/about') {
//     console.log('Uh');
//   }
// });
