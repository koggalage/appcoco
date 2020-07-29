import { Component, OnInit } from '@angular/core';
import { TreatmentHistory } from '../treatment-model';
import { TreatmentDataService } from '../treatment-data-service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomerUIService } from 'src/app/customer/customer-ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatment-history',
  templateUrl: './treatment-history.page.html',
  styleUrls: ['./treatment-history.page.scss'],
})
export class TreatmentHistoryPage implements OnInit {

  public treatmentHistory = new TreatmentHistory();
  public customerId: string;
  private ngUnsubscription = new Subject();

  constructor(
    private customerUIService: CustomerUIService,
    private treatmentDataService: TreatmentDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setCustomerId();
    this.getCustomerTreatments(this.customerId);
  }

  private setCustomerId() {
    this.customerUIService
      .getCustomerId()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((id: string) => {
        this.customerId = id;
      });
  }

  getCustomerTreatments(customerId: string) {
    this.treatmentDataService
      .getTreatmentHistory(customerId)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((history: TreatmentHistory) => {
        this.treatmentHistory = history;
      });
  }

  onBackButtonClick() {
    this.router.navigateByUrl('/doctor-customer-search');
  }

}
