import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerInfo } from '../customer-model';
import { CustomerDataService } from '../customer-data-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Router } from '@angular/router';
import { CustomerUIService } from '../customer-ui.service';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { IonSlides } from '@ionic/angular';
import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.page.html',
  styleUrls: ['./customer-registration.page.scss'],
})
export class CustomerRegistrationPage implements OnInit {
  @ViewChild(SignaturePad, { static: false }) public signaturePad: SignaturePad;
  @ViewChild('slides', { static: false }) slides: IonSlides;

  private baseUrl: string = environment.host;

  public signaturePadOptions: Object = {
    //'minWidth': 4,
    //'canvasWidth': 640,
    'canvasHeight': 200
  };

  public currenSlideIndex: number = 0;
  public slideOptions: {};
  public customerInfo = new CustomerInfo();
  private ngUnsubscription = new Subject();

  public signatureImage: string;
  public isInvalidEmail: boolean = false;
  //public isCustomerIdExist: boolean = false;

  constructor(
    private customerDataService: CustomerDataService,
    private router: Router,
    private customerUIService: CustomerUIService,
    public toastController: ToastController
  ) {
  }

  ngOnInit() {
    this.slideOptions = {
      initialSlide: 0,
      loop: false,
      direction: 'horizontal',
      pager: true,
      speed: 800,
      noSwipingClass: 'swiper-no-swiping',
    };
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

  swipeNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
  }

  swipePreviouse() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
  }

  onBackButtonClick() {
    var thisObj = this;
    this.slides.getActiveIndex().then(function (res) {
      if (res == 0) {
        thisObj.router.navigateByUrl('/home');
      } else {
        thisObj.swipePreviouse();
      }
    });
  }

  onEmailBlur(event: any) {
    console.log('event.target.value', event.target.value);
    this.isInvalidEmail = !EmailValidator.validate(event.target.value);
    console.log('this.isInvalidEmail', this.isInvalidEmail);
  }

  onAddNewCustomer() {

    this.customerInfo.SignatureURL = this.signaturePad.toDataURL();

    this.customerDataService
      .addNewCustomer(this.customerInfo)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: any) => {
        if (value) {
          if (value.ImageName != "") {
            this.customerInfo.SignatureURL = this.baseUrl + "UserImages/Signatures/" + value.ImageName + ".jpg";
          }
          if (value.CustomerId) {
            console.log('value.CustomerId', value.CustomerId);
            this.customerUIService.setCustomerId(value.CustomerId);
            this.customerInfo.CustomerId = value.CustomerId;
          }
          //this.customerUIService.setCustomerId(this.customerInfo.CustomerId);
          this.customerUIService.setSelectedCustomer(this.customerInfo);
          this.presentToast('Success:', 'Successfully Registered!', 3000, 'success');
          this.router.navigateByUrl('/init-concent');
        } else {
          this.presentToast('Error:', 'Registration Failed!', 3000, 'danger');
          console.log("Registration Failed!");
        }
      }, (error: any) => {
        this.presentToast('Error:', 'Registration Failed!', 3000, 'danger');
        console.log("Registration Failed!");
        console.error(error);
      })
  }

  drawComplete() {
    this.customerInfo.SignatureURL = this.signaturePad.toDataURL();
  }

  drawClear() {
    this.signaturePad.clear();
    this.customerInfo.SignatureURL = null;
  }

}
