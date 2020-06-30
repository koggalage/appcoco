import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerUIService } from '../customer-ui.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomerInfo } from '../customer-model';
import { CustomerDataService } from '../customer-data-service';
import { Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { environment } from 'src/environments/environment';

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

  constructor(
    private customerUIService: CustomerUIService,
    private customerDataService: CustomerDataService,
    private router: Router
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

      });
  }

  onUpdateCustomer() {

    if ((this.isFnameNotFilled && !this.customerInfo.FullName) ||
      (this.isMobileNotFilled && !this.customerInfo.MobileNo) ||
      (this.isEmailNotFilled && !this.customerInfo.Email) ||
      (this.isNoSignature && !this.customerInfo.SignatureURL)) {
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
          if (value.ImageName != "") {
            this.customerInfo.SignatureURL = this.baseUrl + "UserImages/Signatures/" + value.ImageName + ".jpg";
            this.customerUIService.setSelectedCustomer(this.customerInfo);
          }
          if (!this.customerInfo.IsFilledInitConcern) {
            this.router.navigateByUrl('/init-concent');
          } else {
            this.router.navigateByUrl('/daily-concent');
          }
        }
      }, (error: any) => {
        console.log('error', error);
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
