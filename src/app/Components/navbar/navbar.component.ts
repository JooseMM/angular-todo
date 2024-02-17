import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  isAboutPage: boolean;
  userLoggedIn = false;
  loggingIn = false;
  showUserOptions = false;
  userCheckSubscription?: Subscription;
  unknownUserPicture = "../../../assets/Images/unkwon-user.svg";
  knownUserPicture = "../../../assets/Images/profile-pic.svg";
  username = '';
  password = '';
  loading = false;
  notificationSubscription?: Subscription;

  constructor(public router: Router, private dataService: DataService) {
    this.isAboutPage = false

  }
  ngOnInit(): void {
    this.router.events.subscribe(():void => {
      if (!this.router.getCurrentNavigation() && this.router.url === '/about') {
        this.isAboutPage = true
      } else { this.isAboutPage = false }
    });
    this.userCheckSubscription = this.dataService.getCurrentUser()
        .subscribe((isUserLoggedIn: boolean) => this.userLoggedIn = isUserLoggedIn );
    this.notificationSubscription = this.dataService.getNotifications().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  onSubmit = (payload: { username: string, password: string }) => {
    this.dataService.userLogin(payload);
    //this.toggleUserLoggingIn();
    this.loading = true;
  }
  toggleUserLoggingIn = ():void => {
    if(this.menuOpen) {
      this.menuOpen = false;
    }
    if(this.showUserOptions ) {
      this.showUserOptions = false;
    }
    this.loggingIn = !this.loggingIn;
  }
  toggleShowUserOptions = ():void => {
    if(this.loggingIn && !this.showUserOptions) {
      this.loggingIn = false;
    }
    this.showUserOptions = !this.showUserOptions;
  }
  userLogout = ():void => {
    this.toggleShowUserOptions();
    this.dataService.userLogout();
  }
  mobileMenuToggle = ():void => {
    this.menuOpen = !this.menuOpen;
    this.showUserOptions = false;
  };
}
