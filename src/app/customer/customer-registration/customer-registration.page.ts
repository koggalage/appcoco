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

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.page.html',
  styleUrls: ['./customer-registration.page.scss'],
})
export class CustomerRegistrationPage implements OnInit {
  @ViewChild(SignaturePad, { static: false }) public signaturePad: SignaturePad;
  @ViewChild('mySlider', { static: false }) slides: IonSlides;

  private baseUrl: string = environment.host;

  public signaturePadOptions: Object = {
    //'minWidth': 4,
    //'canvasWidth': 640,
    'canvasHeight': 200
  };

  public slideOptions: {};
  public customerInfo = new CustomerInfo();
  private ngUnsubscription = new Subject();

  public signatureImage: string;
  //public isCustomerIdExist: boolean = false;

  constructor(
    private customerDataService: CustomerDataService,
    private router: Router,
    private customerUIService: CustomerUIService,
    public toastController: ToastController) {
  }

  ngOnInit() {
    this.slideOptions = {
      initialSlide: 0,
      loop: false,
      direction: 'horizontal',
      pager: true,
      speed: 800
    }
  }

  async presentToast(header: string, message: string, duration: number, color: string) {
    const toast = await this.toastController.create({
      header: 'Error:',
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

  onAddNewCustomer() {

    // this.customerDataService
    //   .getCustomerIdExistency(this.customerInfo.CustomerId)
    //   .pipe(takeUntil(this.ngUnsubscription))
    //   .subscribe((response: boolean) => {
    //     console.log("response", response);
    //     if (response) {
    //       this.isCustomerIdExist = response;
    //       this.presentToast('Error:', 'Customer Id already exist!.', 2000, 'danger');
    //       return;
    //     }
    //   }, (error: any) => {
    //     console.log(error);
    //     this.isCustomerIdExist = true;
    //     this.presentToast('Error:', error, 2000, 'danger');
    //   });

    // this.isCustomerIdExist = false;

    this.customerInfo.SignatureURL = this.signaturePad.toDataURL();

    console.log('url', this.customerInfo.SignatureURL);

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
          this.router.navigateByUrl('/init-concent');
        } else {
          console.log("Registration Failed!");
        }
      }, (error: any) => {
        console.log(error);
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
