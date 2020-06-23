import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  img: any;

  @ViewChild('slider', { static: true, read: ElementRef }) slider: ElementRef;

  constructor(private navParams: NavParams,
    private modalController: ModalController) { }

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  ngOnInit() {
    this.img = this.navParams.get('img');
    console.log('img 2', this.img);
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;

    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
