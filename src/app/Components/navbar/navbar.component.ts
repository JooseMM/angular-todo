import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav
      class="my-10 w-[80%] mx-auto flex justify-between | md:w-auto md:mx-desktop-margin || lg:m-0 lg:py-10 lg:w-auto lg:px-[10%]"
      [ngClass]="isAboutPage ? 'lg:split-navbar-bg' : '' "
    >
      <a
        *ngIf="menuOpen == false"
        class="font-bold text-very-dark-blue"
        routerLink="/"
      >
        Todo App
      </a>

      <!-- Mobile navigation menu -->

      <ul *ngIf="menuOpen" class="flex space-x-[10vw] text-very-dark-blue | md:hidden">
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

      <ul class="hidden md:flex gap-14"
      [ngClass]="isAboutPage ? 'text-white/70' : 'text-very-dark-blue/70' "
      >
      <li>
        <a
        [ngClass]="isAboutPage ? 'hover:text-white/100':'hover:text-very-dark-blue/100' "
        routerLink="/home"
        routerLinkActive="font-bold text-very-dark-blue/100">
          Inicio
        </a>
      </li>
      <li>
        <a
        [ngClass]="isAboutPage ? 'hover:text-white/100':'hover:text-very-dark-blue/100' "
        routerLink="/application"
        routerLinkActive="font-bold text-very-dark-blue/100">
          App
        </a>
      </li>
      <li>
        <a
        [ngClass]="isAboutPage ? 'hover:text-white/100':'hover:text-very-dark-blue/100' "
        routerLink="/about"
        routerLinkActive="font-bold text-white/100">
          Nosotros
        </a>
      </li>
      </ul>
    </nav>
  `,
})
export class NavbarComponent implements OnInit{
  menuOpen: boolean = false;
  menuIconSrc: string = '../../assets/Icons/menu-icon.svg';
  menuIconClass: string = 'w-8 h-6 md:hidden';
  isAboutPage: boolean;
  constructor(public router: Router) {
    this.isAboutPage = false
  }
  ngOnInit(): void {
    this.router.events.subscribe(():void => {
      if (!this.router.getCurrentNavigation() && this.router.url === '/about') {
        this.isAboutPage = true
      }
      else { this.isAboutPage = false }
    });
  }

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
