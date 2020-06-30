import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerSearchRequest, CustomerInfo } from '../customer-model';
import { CustomerDataService } from '../customer-data-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerUIService } from '../customer-ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.page.html',
  styleUrls: ['./customer-search.page.scss'],
})
export class CustomerSearchPage implements OnInit, OnDestroy {

  private baseUrl: string = environment.host;

  public customers: any[];

  public isNotRegistered: boolean = true;
  public isSearched: boolean = false;

  public customerInfo: CustomerInfo[];
  public customerSearchRequest = new CustomerSearchRequest();
  private ngUnsubscription = new Subject();
  public title: string;
  private selectedRegNo: number;
  public user: any;


  constructor(
    private customerDataService: CustomerDataService,
    private customerUIService: CustomerUIService,
    private router: Router
  ) {
    this.title = "Customer Search";
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  seachCustomers() {
    this.customerDataService
      .searchCustomers(this.customerSearchRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customers: CustomerInfo[]) => {
        this.customerInfo = customers;
        this.isNotRegistered = (this.customerInfo.length == 0);
        console.log('this.isNotRegistered', this.isNotRegistered);
        this.isSearched = true;
      })
  }

  redirectCustomer(customer: CustomerInfo) {
    this.selectedRegNo = parseInt(customer.CustomerId.replace(/^.{2}/g, ''));
    this.customerUIService.setCustomerId(customer.CustomerId);

    if (customer.SignatureURL != "") {
      customer.SignatureURL = this.baseUrl + "UserImages/Signatures/" + customer.SignatureURL + ".jpg";
    }
    this.customerUIService.setSelectedCustomer(customer);

    this.customerInfo = [];
    this.isNotRegistered = true;
    this.isSearched = false;
    this.customerSearchRequest = new CustomerSearchRequest();

    console.log('this.user.UserType', this.user.UserType);
    if (this.user.UserType == "Doctor") {
      this.router.navigate(['/history-list']);
    } else {
      if (customer.FullName == null ||
        //customer.Lname == null ||
        //customer.DoB == null ||
        customer.MobileNo.replace(/\s/g, "") == "" ||
        customer.Email == null ||
        customer.SignatureURL == null) {
        this.router.navigate(['/customer-info']);
      } else if (!customer.IsFilledInitConcern) {
        this.router.navigate(['/init-concent']);
      } else {
        this.router.navigate(['/daily-concent']);
      }

    }


  }

  ngOnDestroy(): void {
  }
}
