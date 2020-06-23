import { Injectable } from '@angular/core';
import { BaseDataService } from '../core/app-service/base-data.service';
import { Observable } from 'rxjs';
import { DailyConcentSaveRequest, InitConcentSaveRequest } from '../concent/concent-model';
import { Route, ActivatedRoute } from '@angular/router';

@Injectable()
export class ConcentDataService {

  private apiConcentUrl = 'Concents';

  constructor(
    private baseDataService: BaseDataService,
  ) { }

  public addNewDailyConcent(body: DailyConcentSaveRequest): Observable<boolean> {
    return this.baseDataService.makePostCall(`${this.apiConcentUrl}/${'daily-consent'}`, body)
  }

  public addNewInitConcent(body: InitConcentSaveRequest): Observable<boolean> {
    return this.baseDataService.makePostCall(`${this.apiConcentUrl}/${'init-consent'}`, body)
  }

}
