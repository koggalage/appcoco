import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerUIService } from '../customer-ui.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomerInfo } from '../customer-model';
import { CustomerDataService } from '../customer-data-service';
import { Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { environment } from 'src/environments/environment';
import * as EmailValidator from 'email-validator';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.page.html',
  styleUrls: ['./customer-info.page.scss'],
})
export class CustomerInfoPage implements OnInit {
  @ViewChild(SignaturePad, { static: false }) public signaturePad: SignaturePad;

  private baseUrl: string = environment.host;

  public signaturePadOptions: Object = {
    //'minWidth': 4,
    //'canvasWidth': 640,
    'canvasHeight': 200
  };

  public signatureImage: string;

  private ngUnsubscription = new Subject();
  public customerInfo = new CustomerInfo();

  public isFnameNotFilled: boolean = false;
  public isLnameNotFilled: boolean = false;
  public isDoBNotFilled: boolean = false;
  public isMobileNotFilled: boolean = false;
  public isEmailNotFilled: boolean = false;
  public isNoSignature: boolean = false;
  public isInvalidEmail: boolean = false;
  public isMobileEmpty: boolean = false;

  constructor(
    private customerUIService: CustomerUIService,
    private customerDataService: CustomerDataService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getCustomerInfo();
  }

  private getCustomerInfo() {
    this.customerUIService
      .getSelectedCustomer()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customerInfoResponse: CustomerInfo) => {
        this.customerInfo = customerInfoResponse;
        console.log("customerInfo", this.customerInfo);

        this.isFnameNotFilled = (!this.customerInfo.FullName);
        this.isMobileNotFilled = (this.customerInfo.MobileNo.replace(/\s/g, "") == "");
        this.isEmailNotFilled = (!this.customerInfo.Email);
        this.isNoSignature = (!this.customerInfo.SignatureURL);
        //this.isLnameNotFilled = (!this.customerInfo.Lname);
        //this.isDoBNotFilled = (!this.customerInfo.DoB);
        console.log('this.customerInfo.MobileNo', this.customerInfo.MobileNo);
        console.log('isMobileNotFilled', this.isMobileNotFilled);
      });
  }

  onUpdateCustomer() {

    console.log('isMobileNotFilled', this.isMobileNotFilled);
    console.log('isMobileNotFilled', this.customerInfo.MobileNo);

    if ((this.isFnameNotFilled && !this.customerInfo.FullName) ||
      (this.isEmailNotFilled && !this.customerInfo.Email) ||
      (this.isNoSignature && !this.customerInfo.SignatureURL)) {
      return;
    }

    if (this.isMobileNotFilled && this.customerInfo.MobileNo.trim() == '') {
      this.isMobileEmpty = true;
      return;
    }

    // if (!this.isNoSignature) {
    //   this.customerInfo.SignatureURL = "";
    // }

    this.customerDataService
      .updateCustomer(this.customerInfo)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: any) => {
        if (value) {
          this.presentToast('Success:', 'Successfully Updated!', 3000, 'success');
          if (value.ImageName != "") {
            this.isMobileEmpty = false;
            this.customerInfo.SignatureURL = this.baseUrl + "UserImages/Signatures/" + value.ImageName + ".jpg";
            this.customerUIService.setSelectedCustomer(this.customerInfo);
          }
          if (!this.customerInfo.IsFilledInitConcern) {
            this.router.navigateByUrl('/init-concent');
          } else {
            this.router.navigateByUrl('/daily-concent');
          }
        } else {
          this.presentToast('Error:', 'Update Failed!', 3000, 'danger');
          console.log("Update Failed!");
        }
      }, (error: any) => {
        this.presentToast('Error:', 'Update Failed!', 3000, 'danger');
        console.error('error', error);
      })
  }

  drawComplete() {
    this.customerInfo.SignatureURL = this.signaturePad.toDataURL();
  }

  drawClear() {
    this.signaturePad.clear();
    this.customerInfo.SignatureURL = null;
  }

  onBackButtonClick() {
    this.router.navigateByUrl('/customer-search');
  }

  onEmailBlur(event: any) {
    console.log('event.target.value', event.target.value);
    this.isInvalidEmail = !EmailValidator.validate(event.target.value);
    console.log('this.isInvalidEmail', this.isInvalidEmail);
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

}
