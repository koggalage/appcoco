import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public isLoggedIn: boolean = false;
  user: any;
  pages = [];



  selectedPath = '';

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private menuController: MenuController) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
      this.isLoggedIn = localStorage.getItem('isLoggedIn') == 'true';
      this.user = JSON.parse(localStorage.getItem('currentUser'));

      if (!this.user || this.user.UserType == null || this.user.UserType == undefined) {
        this.authenticationService.logout();
        return;
        //this.router.navigate(['/login']);
      }



      if (this.user.UserType == "Doctor") {
        this.pages = [
          {
            title: 'Search',
            url: '/menu/customer-search'
          },
          {
            title: 'Daily Update',
            url: '/menu/daily-update'
          },
          {
            title: 'Treatment History List',
            url: '/menu/history-list'
          },
          {
            title: 'Treatment History Details',
            url: '/menu/history-details'
          }
        ];
      } else {
        this.pages = [
          {
            title: 'Search',
            url: '/menu/customer-search'
          },
          {
            title: 'Registration',
            url: '/menu/customer-registration'
          },
          {
            title: 'Initial Concent',
            url: '/menu/init-concent'
          },
          {
            title: 'Daily Concent',
            url: '/menu/daily-concent'
          }
        ];
      }

    });
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') == 'true';
    console.log('this.isLoggedIn init', localStorage.getItem('isLoggedIn'));
    if (!this.isLoggedIn) {
      this.authenticationService.logout();
      //this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  // toggleMenu() {
  //   this.isLoggedIn = !this.isLoggedIn;
  // }

  toggle() {
    this.menuController.toggle();
  }

}
