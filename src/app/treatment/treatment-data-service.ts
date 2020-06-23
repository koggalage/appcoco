import { Injectable } from '@angular/core';
import { BaseDataService } from '../core/app-service/base-data.service';
import { Observable } from 'rxjs';
import { TreatmentHistory, DailyUpdateSaveRequest } from './treatment-model';
import { TreatmentHistoryDates, TreatmentDetailsResponse } from '../history/history-model';

@Injectable()
export class TreatmentDataService {

  private apiTreatmentUrl = 'Treatment';

  constructor(
    private baseDataService: BaseDataService
  ) { }

  public getTreatmentHistory(customerId: string): Observable<TreatmentHistory> {
    let queryString = `customerId=${customerId}`;
    return this.baseDataService.makeGetCall(`${this.apiTreatmentUrl}/${'history'}/?${queryString}`);
  }

  public addNewDailyUpdate(body: DailyUpdateSaveRequest): Observable<boolean> {
    return this.baseDataService.makePostCall(`${this.apiTreatmentUrl}/${'save'}`, body)
  }

  public getTreatmentHistoryDates(customerId: string): Observable<TreatmentHistoryDates[]> {
    let queryString = `customerId=${customerId}`;
    return this.baseDataService.makeGetCall(`${this.apiTreatmentUrl}/${'dates'}/?${queryString}`);
  }

  public getDailyUpdateByDate(tduid: number): Observable<TreatmentDetailsResponse> {
    let queryString = `tduid=${tduid}`;
    return this.baseDataService.makeGetCall(`${this.apiTreatmentUrl}/${'filter'}/?${queryString}`);
  }

}
