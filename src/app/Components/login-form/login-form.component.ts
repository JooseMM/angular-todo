import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  template: `
      <form #form="ngForm" (ngSubmit)="onSubmit(form.value)"
        class="active-form outline outline-light-blue/30 outline-1 flex-col z-10 text-white bg-very-dark-blue rounded-md px-6 py-8 absolute flex
         top-[150%] left-0 right-0 mx-auto max-w-sm shadow-2xl  ">
        <h3 class="font-bold text-xl">Iniciar Sesion</h3>
        <button type="button" (click)="toggleComponent()" class="absolute right-5 top-6">
          <svg width="20" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 2.5335L22.4821 0L12.5 10.0441L2.51786 0L0 2.5335L9.98214 12.5776L0 22.6218L2.51786 25.1553L12.5 15.1111L22.4821 25.1553L25 22.6218L15.0179 12.5776L25 2.5335Z" fill="#FFF"/>
          </svg>
        </button>
          <input type="text" name="username"
          class="w-full rounded py-2 text-lg px-3 mt-2 relative text-very-dark-blue"
          required
          placeholder="Nombre de usuario"
          [(ngModel)]="username"
          #userError="ngModel"
          />
          <small class="text-red-400" *ngIf="userError.errors?.['required'] && (userError.dirty || userError.touched)">Ingresa un usuario</small>
        <input type="password" name="password"
          class="w-full rounded py-2 text-lg px-3 mt-3 relative text-very-dark-blue"
        [ngClass]="userError.errors?.['required'] && (userError.dirty || userError.touched) || failLogin ? ' border-solid border-2 border-red-400' : 'mt-3' "
        placeholder="Contraseña"
        required
        [(ngModel)]="password"
        #passError="ngModel"
        />
        <small *ngIf="passError.errors?.['required'] && (passError.dirty || passError.touched) || failLogin" class="text-red-400">Usuario o contraseña incorrecta</small>
        <div class="flex items-start justify-between">
          <a routerLink="/about"><small class="opacity-70">Olvide mi contraseña</small></a>
            <button type="submit" [disabled]="form.invalid" (click)="onSubmit(form.value)" class="bg-orange-btn flex justify-center items-center text-base font-bold invalid:opacity-50 py-1 rounded mt-3 w-28 h-8">
              <img *ngIf="loading; else elseSpan" class="animate-spin" width="20" height="20" src="../../../assets/Icons/loader.svg" />
              <ng-template #elseSpan >Ingresar</ng-template>
            </button>
        </div>
      </form>
  `,
  styles: [
  ]
})
export class LoginFormComponent implements OnInit {
  username = '';
  password = '';
  loading = false;
  failLogin = false;
  notificationSubscription?: Subscription;
 @Output() toggleComponentView: EventEmitter<void> = new EventEmitter<void>();
  constructor(private dataService: DataService) {}
  onSubmit = (payload: { username: string, password: string }) => {
    this.dataService.userLogin(payload);
    this.failLogin = false;
    this.loading = true;
  }
  ngOnInit(): void {
    this.notificationSubscription = this.dataService.getNotifications().subscribe({
      next: (value: string) => {
        if(value.includes("Bienvenido")) {
          this.toggleComponent();
        }
        if(value.includes("fallida")) {
          this.failLogin = true;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  toggleComponent() {
    this.toggleComponentView.emit();

  }
}
