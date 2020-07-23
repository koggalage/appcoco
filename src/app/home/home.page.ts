import { Component } from '@angular/core';

// temp
import { IonSlides } from '@ionic/angular';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user: any;
  public userName: string;
  images: any[];

  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.initializeItems();

    this.userName = this.user.FullName.split(" ")[0];
    console.log('this.userName', this.userName);
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  initializeItems() {

    this.images = [
      {
        "url": '../assets/img/img1.jpg'
      },
      {
        "url": '../assets/img/img2.jpg'
      },
      {
        "url": '../assets/img/img3.jpg'
      },
      {
        "url": '../assets/img/img4.jpg'
      },
      {
        "url": '../assets/img/img5.jpg'
      },
      {
        "url": '../assets/img/img6.jpg'
      },
      {
        "url": '../assets/img/img7.jpg'
      }
    ]
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
