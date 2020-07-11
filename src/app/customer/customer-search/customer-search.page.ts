import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerSearchRequest, CustomerInfo } from '../customer-model';
import { CustomerDataService } from '../customer-data-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerUIService } from '../customer-ui.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.page.html',
  styleUrls: ['./customer-search.page.scss'],
})
export class CustomerSearchPage implements OnInit, OnDestroy {

  public customers: any[];
  public isShowLoader: boolean = false;
  public isNoKeyword: boolean = false;
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
    if (!this.customerSearchRequest.CustomerId &&
      !this.customerSearchRequest.CustomerName &&
      !this.customerSearchRequest.MobileNo) {
      this.isNoKeyword = true;
      return;
    }

    this.isNoKeyword = false;;
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
