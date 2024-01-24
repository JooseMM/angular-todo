import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  isAboutPage: boolean;
  userLoggedIn = false;
  loggingIn = false;
  showUserOptions = false;
  userCheckSubscription?: Subscription;
  unknownUserPicture = "../../../assets/Images/unkwon-user.svg";
  knownUserPicture = "../../../assets/Images/profile-pic.svg";
  menuIconSrc: string = "../../assets/Icons/menu-icon.svg";
  menuIconClass: string = "w-8 h-6 md:hidden";
  username = '';
  password = '';

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
  onSubmit = (payload: { username: string, password: string }) => {
    this.dataService.userLogin(payload);
    this.toggleUserLoggingIn();
  }
  toggleUserLoggingIn = ():void => {
    if(this.showUserOptions) { this.toggleShowUserOptions(); }
    this.loggingIn = !this.loggingIn;
  }
  toggleShowUserOptions = ():void => {
    this.showUserOptions = !this.showUserOptions;
  }
  userLogout = ():void => {
    this.toggleShowUserOptions();
    this.dataService.userLogout();
  }
  mobileMenuToggle = ():void => {
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
