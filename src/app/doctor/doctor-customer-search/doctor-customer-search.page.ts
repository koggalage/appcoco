import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerSearchRequest, CustomerInfo } from '../../customer/customer-model';
import { CustomerDataService } from '../../customer/customer-data-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerUIService } from '../../customer/customer-ui.service';

@Component({
  selector: 'app-doctor-customer-search',
  templateUrl: './doctor-customer-search.page.html',
  styleUrls: ['./doctor-customer-search.page.scss'],
})
export class DoctorCustomerSearchPage implements OnInit {

  public customers: any[];
  public isShowLoader: boolean = false;
  public customerSearchRequest = new CustomerSearchRequest();
  private ngUnsubscription = new Subject();

  constructor(
    private customerDataService: CustomerDataService,
    private customerUIService: CustomerUIService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  seachCustomers() {
    this.isShowLoader = true;
    this.customerDataService
      .searchCustomers(this.customerSearchRequest)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customers: CustomerInfo[]) => {
        this.isShowLoader = false;
        this.customerUIService.saveSearchedCustomers(customers);
        this.router.navigate(['/customer-serch-result']);
      }, (error) => {
        this.isShowLoader = false;
      }
      );
  }

  public onResetClick() {
    this.customerSearchRequest = new CustomerSearchRequest();
  }

  ngOnDestroy(): void {
  }

}
