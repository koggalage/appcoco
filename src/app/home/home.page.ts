import { Component } from '@angular/core';

// temp
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  images: any[];

  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  constructor() {
    this.initializeItems();
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

}
