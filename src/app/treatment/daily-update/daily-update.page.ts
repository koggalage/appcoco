import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { File } from '@ionic-native/file/ngx';
import { CustomerInfo } from '../../customer/customer-model';
import { takeUntil } from 'rxjs/operators';
import { TreatmentDataService } from '../treatment-data-service';
import { Subject } from 'rxjs';
import { DailyUpdateSaveRequest } from '../../treatment/treatment-model';
import * as moment from 'moment';
import { CustomerUIService } from '../../customer/customer-ui.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/image-modal/image-modal.page';

@Component({
  selector: 'app-daily-update',
  templateUrl: './daily-update.page.html',
  styleUrls: ['./daily-update.page.scss'],
})
export class DailyUpdatePage implements OnInit {

  public customerInfo = new CustomerInfo();
  public dailyUpdateSaveRequest = new DailyUpdateSaveRequest();
  public photos: any = [];
  private ngUnsubscription = new Subject();
  public date: string;

  public sliderOptions = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(
    public camera: Camera,
    public file: File,
    private modalController: ModalController,
    private customerUIService: CustomerUIService,
    private treatmentDataService: TreatmentDataService,
    private router: Router,
    public toastController: ToastController
  ) {
    this.date = moment().format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.getCustomerInfo();
  }

  private getCustomerInfo() {
    this.customerUIService
      .getSelectedCustomer()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customerInfoResponse: CustomerInfo) => {
        this.customerInfo = customerInfoResponse;
        this.dailyUpdateSaveRequest.CustomerId = this.customerInfo.CustomerId;
        console.log("customerInfo", this.customerInfo);
      });
  }

  TakePhotos() {

    const options: CameraOptions = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      //encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture().then((imageData) => {
      let fileName = imageData.substring(imageData.lastIndexOf('/') + 1);
      let path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, fileName).then((base64data) => {
        this.dailyUpdateSaveRequest.TreatmentImageURLs.push(base64data);
      })
    }, (err) => {
      console.log(err);
    });
  }

  onAddNewDailyUpdate() {
    this.dailyUpdateSaveRequest.Date = new Date((moment().format('YYYY-MM-DD')));

    this.treatmentDataService
      .addNewDailyUpdate(this.dailyUpdateSaveRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: boolean) => {
        if (value) {
          console.log(value);
          this.presentToast('Success:', 'Successfully Saved!', 3000, 'success');
          this.router.navigateByUrl('/customer-search');
        } else {
          console.log("Failed to save!");
          this.presentToast('Error:', 'Failed to save!', 3000, 'danger');
        }
      }, (error: any) => {
        this.presentToast('Error:', 'Failed to save!', 3000, 'danger');
        console.error(error);
      })
  }

  onImageClick(img) {
    console.log('img', img);
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

  async presentToast(header: string, message: string, duration: number, color: string) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      duration: duration,
      position: 'top',
      color: color
    });
    toast.present();
  }

  onBackButtonClick() {
    this.router.navigateByUrl('/doctor-menu');
  }

}
