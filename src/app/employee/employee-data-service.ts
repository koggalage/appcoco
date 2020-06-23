import { Injectable } from '@angular/core';
import { BaseDataService } from '../core/app-service/base-data.service';
import { Observable } from 'rxjs';
import { EmployeeListInfo } from './employee-model';

@Injectable()
export class EmployeeDataService {

    private apiEmployeeUrl = 'Employee';

    constructor(
        private baseDataService: BaseDataService
    ) { }

    public getEmployeeList(designationId: number): Observable<EmployeeListInfo[]> {
        let queryString = `designationId=${designationId}`;
        return this.baseDataService.makeGetCall(`${this.apiEmployeeUrl}/${'emplist'}/?${queryString}`);
    }

    public getUserList(designation: string): Observable<EmployeeListInfo[]> {
        let queryString = `designation=${designation}`;
        return this.baseDataService.makeGetCall(`${this.apiEmployeeUrl}/${'userlist'}/?${queryString}`);
    }

}
