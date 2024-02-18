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
  }
  toggleFromChild() {
    this.loggingIn = !this.loggingIn;
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
