import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { CustomerInfo } from '../../customer/customer-model';
import { DailyConcentSaveRequest } from '../concent-model';
//import { CustomerDataService } from '../../customer/customer-data-service';
import { ConcentDataService } from '../concent-data-service';
import { CustomerUIService } from '../../customer/customer-ui.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { EmployeeUIService } from 'src/app/employee/employee-ui.service';
import { EmployeeListInfo } from 'src/app/employee/employee-model';
import { EmployeeDataService } from 'src/app/employee/employee-data-service';
import { IonSlides, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-daily-concent',
  templateUrl: './daily-concent.page.html',
  styleUrls: ['./daily-concent.page.scss'],
})
export class DailyConcentPage implements OnInit {
  @ViewChild(SignaturePad, { static: false }) public signaturePad: SignaturePad;
  @ViewChild('slides', { static: false }) slides: IonSlides;

  private baseUrl: string = environment.host;

  public customerInfo = new CustomerInfo();
  public dailyConcentSaveRequest = new DailyConcentSaveRequest();

  private ngUnsubscription = new Subject();
  //public title: string;
  public myself: boolean;
  public customerId: number;

  public empSignatureUrl: string;
  public userSignatureUrl: string;

  public showEmployeeList: boolean = false;
  public showUserList: boolean = false;

  public isEmpSignatureNA: boolean = true;
  public isUserSignatureNA: boolean = true;

  public empList: any[];
  public empListConstant: any[];

  public userList: any[];
  public userListConstant: any[];

  public empSearchText: string;
  public userSearchText: string;
  public slideOptions: {};

  constructor(
    private concentDataService: ConcentDataService,
    private customerUIService: CustomerUIService,
    private employeeDataService: EmployeeDataService,
    private router: Router,
    public toastController: ToastController
  ) {
    this.myself = true;
    this.dailyConcentSaveRequest.ConsentDatetime = moment().format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.getCustomerInfo();
    this.getEmployeeList();
    this.getUserList();

    this.slideOptions = {
      initialSlide: 0,
      loop: false,
      direction: 'horizontal',
      pager: true,
      speed: 800,
      noSwipingClass: 'swiper-no-swiping',
    };
  }

  private getCustomerInfo() {
    this.customerUIService
      .getSelectedCustomer()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customerInfoResponse: CustomerInfo) => {
        this.customerInfo = customerInfoResponse;
        //this.customerInfo.SignatureURL = this.baseUrl + "UserImages/Signatures/" + this.customerInfo.SignatureURL + ".jpg";
      });
  }

  onAddNewDailyConcent() {

    if (!this.dailyConcentSaveRequest.IsTherapistSigned ||
      !this.dailyConcentSaveRequest.IsDoctorSinged ||
      this.isEmpSignatureNA || this.isUserSignatureNA) {
      return;
    }

    this.dailyConcentSaveRequest.CustomerId = this.customerInfo.CustomerId;

    this.concentDataService
      .addNewDailyConcent(this.dailyConcentSaveRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: boolean) => {
        if (value) {
          this.presentToast('Success:', 'Successfully Saved!', 3000, 'success');
          this.router.navigateByUrl('/home');
        } else {
          console.log("Failed to save!");
          this.presentToast('Error:', 'Failed to save!', 3000, 'danger');
        }
      }, (error: any) => {
        this.presentToast('Error:', 'Failed to save!', 3000, 'danger');
        console.error(error);
      })
  }

  private getEmployeeList() {
    this.employeeDataService.getEmployeeList(6)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((employeeListResponse: EmployeeListInfo[]) => {
        this.empList = employeeListResponse;
        this.empListConstant = employeeListResponse;
      })
  };

  private getUserList() {
    this.employeeDataService.getUserList('Doctor')
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((userListResponse: EmployeeListInfo[]) => {
        this.userList = userListResponse;
        this.userListConstant = userListResponse;
      })
  };

  onSearchEmp(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.empList = this.empList.filter((emp) => {
        return (emp.EmpName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      // if (this.empList.length == 0 || this.empList.length == undefined) {
      //   this.empList = this.empListConstant;
      // }
    } else {
      this.empList = this.empListConstant;
    }
    this.showEmployeeList = (val && val.trim() != '');
  }

  onSearchUser(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.userList = this.userList.filter((user) => {
        return (user.EmpName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      // if (this.userList.length == 0 || this.userList.length == undefined) {
      //   this.userList = this.userListConstant;
      // }
    } else {
      this.userList = this.userListConstant;
    }
    this.showUserList = (val && val.trim() != '');
  }

  setEmployeeSignature(emp: any) {
    if (!emp.SignatureURL) {
      this.isEmpSignatureNA = true;
    } else {
      this.empSignatureUrl = this.baseUrl + "UserImages/Signatures/" + emp.SignatureURL + ".jpg";
      this.isEmpSignatureNA = false;;
    }
    this.empList = this.empListConstant;
    this.showEmployeeList = false;
    this.dailyConcentSaveRequest.TherapistId = emp.EmpNo;
    this.dailyConcentSaveRequest.IsTherapistSigned = false;
    this.empSearchText = emp.EmpName;
  }

  setUserSignature(user: any) {
    if (!user.SignatureURL) {
      this.isUserSignatureNA = true;
    } else {
      this.userSignatureUrl = this.baseUrl + "UserImages/Signatures/" + user.SignatureURL + ".jpg";
      this.isUserSignatureNA = false;;
    }
    this.userList = this.userListConstant;
    this.showUserList = false;
    this.dailyConcentSaveRequest.DoctorId = user.EmpNo;
    this.dailyConcentSaveRequest.IsDoctorSinged = false;
    this.userSearchText = user.EmpName;
  }

  onBackButtonClick() {
    var thisObj = this;
    this.slides.getActiveIndex().then(function (res) {
      if (res == 0) {
        thisObj.router.navigateByUrl('/customer-search');
      } else {
        thisObj.swipePreviouse();
      }
    });
  }

  swipeNext(form: any) {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
  }

  swipePreviouse() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
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
