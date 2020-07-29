import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerUIService } from 'src/app/customer/customer-ui.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomerInfo } from 'src/app/customer/customer-model';

@Component({
  selector: 'app-doctor-menu',
  templateUrl: './doctor-menu.page.html',
  styleUrls: ['./doctor-menu.page.scss'],
})
export class DoctorMenuPage implements OnInit {

  private ngUnsubscription = new Subject();
  public customerInfo = new CustomerInfo();

  constructor(
    private customerUIService: CustomerUIService,
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
        console.log('init custinfo', this.customerInfo);
      });
  }

  public onDailyUpdateClick() {
    this.router.navigate(['/daily-update']);
  }

  public onHistoryListClick() {
    this.router.navigate(['/history-list']);
  }

  onBackButtonClick() {
    this.router.navigateByUrl('/customer-search');
  }

}
