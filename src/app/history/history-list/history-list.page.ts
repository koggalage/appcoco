import { Component, OnInit } from '@angular/core';
import { CustomerUIService } from '../../customer/customer-ui.service';
import { TreatmentDataService } from '../../treatment/treatment-data-service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TreatmentHistoryDates, TreatmentDetailsResponse } from '../history-model';
import { HistoryUIService } from '../history-ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.page.html',
  styleUrls: ['./history-list.page.scss'],
})
export class HistoryListPage implements OnInit {

  private ngUnsubscription = new Subject();
  private customerId: string;
  public treatmentDates: TreatmentHistoryDates[];

  constructor(
    private customerUIService: CustomerUIService,
    private historyUIService: HistoryUIService,
    private treatmentDataService: TreatmentDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCustomerId();
  }

  private getTreatmentDates() {
    this.treatmentDataService.getTreatmentHistoryDates(this.customerId)
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((histdatesory: TreatmentHistoryDates[]) => {
        this.treatmentDates = histdatesory;
        console.log('treatmentDates', this.treatmentDates);
      });
  }

  private getCustomerId() {
    this.customerUIService
      .getCustomerId()
      .pipe(takeUntil(this.ngUnsubscription))
      .subscribe((customerId: string) => {
        this.customerId = customerId;
        this.getTreatmentDates();
      });
  }

  onDateClick(tduid: number) {
    this.historyUIService.setTduid(tduid);
    this.router.navigate(['/history-details']);
  }

}
