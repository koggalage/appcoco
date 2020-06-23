import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerDataService } from '../../customer/customer-data-service';
import { ConcentDataService } from '../concent-data-service';
import { Subject } from 'rxjs';
import { CustomerInfo } from 'src/app/customer/customer-model';
import { takeUntil } from 'rxjs/operators';
import { InitConcentSaveRequest } from '../concent-model';
import { CustomerUIService } from '../../customer/customer-ui.service';
//import { ConstantPool } from '@angular/compiler';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { EmployeeDataService } from 'src/app/employee/employee-data-service';
import { EmployeeListInfo } from 'src/app/employee/employee-model';

@Component({
  selector: 'app-init-concent',
  templateUrl: './init-concent.page.html',
  styleUrls: ['./init-concent.page.scss'],
})
export class InitConcentPage implements OnInit {
  @ViewChild(SignaturePad, { static: false }) public signaturePad: SignaturePad;

  public title: string;
  public customerId: number;
  public customerInfo = new CustomerInfo();
  private ngUnsubscription = new Subject();
  public initConcentSaveRequest = new InitConcentSaveRequest();
  public CustomerId: string;
  private baseUrl: string = environment.host;

  public empSignatureUrl: string;
  public userSignatureUrl: string;

  public showEmployeeList: boolean = false;
  public showUserList: boolean = false;

  public isEmpSignatureNA: boolean = false;
  public isUserSignatureNA: boolean = false;

  public empList: any[];
  public empListConstant: any[];

  public userList: any[];
  public userListConstant: any[];

  public empSearchText: string;
  public userSearchText: string;

  constructor(
    private concentDataService: ConcentDataService,
    private customerUIService: CustomerUIService,
    private employeeDataService: EmployeeDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCustomerInfo();
    this.getEmployeeList();
    this.getUserList();
  }

  private getCustomerInfo() {
    this.customerUIService
      .getSelectedCustomer()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customerInfoResponse: CustomerInfo) => {
        this.customerInfo = customerInfoResponse;
        console.log('init custinfo', this.customerInfo.SignatureURL);
      });
  }

  onAddNewInitConcent() {

    if (!this.initConcentSaveRequest.IsTherapistSigned ||
      !this.initConcentSaveRequest.IsDoctorSinged ||
      this.isEmpSignatureNA || this.isUserSignatureNA) {
      return;
    }

    this.initConcentSaveRequest.CustomerId = this.customerInfo.CustomerId;

    this.concentDataService
      .addNewInitConcent(this.initConcentSaveRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((value: boolean) => {
        if (value) {
          console.log(value);
          this.router.navigateByUrl('menu/daily-concent');
        }
      }, (error: any) => {
        console.log(error);
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
    const val = ev.target.value;;

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
    const val = ev.target.value;;

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
    this.initConcentSaveRequest.TherapistId = emp.EmpNo;
    this.initConcentSaveRequest.IsTherapistSigned = false;
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
    this.initConcentSaveRequest.DoctorId = user.EmpNo;
    this.initConcentSaveRequest.IsDoctorSinged = false;
    this.userSearchText = user.EmpName;
  }

}
