import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav
      class="relative my-10 w-[80%] mx-auto flex justify-between items-center
      | md:w-auto md:mx-desktop-margin
      | lg:m-0 lg:py-10 lg:w-auto lg:px-[10%] "
      [ngClass]="isAboutPage ? 'lg:split-navbar-bg' : '' " >
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
        class="transition duration-200"
        [ngClass]="isAboutPage ? 'hover:text-white/100':'hover:text-very-dark-blue/100' "
        routerLink="/home"
        routerLinkActive="font-bold text-very-dark-blue/100">
          Inicio
        </a>
      </li>
      <li>
        <a
        class="transition duration-200"
        [ngClass]="isAboutPage ? 'hover:text-white/100':'hover:text-very-dark-blue/100' "
        routerLink="/application"
        routerLinkActive="font-bold text-very-dark-blue/100">
          App
        </a>
      </li>
      <li>
        <a
        class="transition duration-200"
        [ngClass]="isAboutPage ? 'hover:text-white/100':'hover:text-very-dark-blue/100' "
        routerLink="/about"
        routerLinkActive="font-bold text-white/100">
          Nosotros
        </a>
      </li>
      </ul>
      <button class="hidden | lg:block">
        <img src="../../../assets/Images/profile-pic.svg" alt="Foto de perfil"/>
      </button>
      <form #form="ngForm" (ngSubmit)="onSubmit(form.value)" class="flex-col w-[300] z-10 text-white bg-very-dark-blue rounded-md px-6 py-5 absolute top-24 hidden | lg:flex lg:top-auto lg:bottom-[-120%] lg:right-[10%] lg:w-[300px] shadow-2xl">
        <h3 class="font-bold text-lg">Iniciar Sesion</h3>
          <input type="text" name="username"
          class="w-full rounded py-1 px-3 mt-1 relative text-very-dark-blue"
          required
          placeholder="Nombre de usuario"
          [(ngModel)]="username"
          #userError="ngModel"
          />
          <small class="text-red-400" *ngIf="userError.errors?.['required'] && (userError.dirty || userError.touched)">Ingresa un usuario</small>
        <input type="password" name="password"
        class="rounded py-1 px-3 text-very-dark-blue"
        [ngClass]="userError.errors?.['required'] && (userError.dirty || userError.touched) ? 'mt-1' : 'mt-3' "
        placeholder="Contraseña"
        required
        [(ngModel)]="password"
        #passError="ngModel"
        />
        <small *ngIf="passError.errors?.['required'] && (passError.dirty || passError.touched)" class="text-red-400">Usuario o contraseña incorrecta</small>
        <div class="flex items-start justify-between">
          <a routerLink="/about"><small class="opacity-70">Olvide mi contraseña</small></a>
            <button type="submit" [disabled]="form.invalid" class="bg-orange-btn text-base font-bold px-4 py-1 rounded mt-3 | lg:px-6">Ingresar</button>
        </div>
      </form>
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  menuIconSrc: string = '../../assets/Icons/menu-icon.svg';
  menuIconClass: string = 'w-8 h-6 md:hidden';
  isAboutPage: boolean;
  username = '';
  password = '';
  constructor(public router: Router, private dataService: DataService) {
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
  onSubmit = (payload: { username: string, password: string }) => {
    this.dataService.userLogin(payload);
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
