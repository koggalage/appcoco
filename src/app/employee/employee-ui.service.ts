import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ComponentStatus } from '../shared/shared-model';
import { EmployeeListInfo } from './employee-model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeUIService {

    private readonly currentlyLoadedComponent$: Subject<ComponentStatus> = new Subject();
    private readonly selectedEmployee$: BehaviorSubject<EmployeeListInfo[]> = new BehaviorSubject<EmployeeListInfo[]>(null);
    private readonly selectedUser$: BehaviorSubject<EmployeeListInfo[]> = new BehaviorSubject<EmployeeListInfo[]>(null);

    constructor() { }

    public setLoadPanel(messageHandler: ComponentStatus) {
        this.currentlyLoadedComponent$.next(messageHandler);
    }

    public getLoadPanel() {
        return this.currentlyLoadedComponent$.asObservable();
    }

    public setSelectedEmployees(Employee: EmployeeListInfo[]) {
        this.selectedEmployee$.next(Object.assign({}, Employee));
    }

    public getSelectedEmployees(): Observable<EmployeeListInfo[]> {
        return this.selectedEmployee$.asObservable();
    }

    public setSelectedUser(User: EmployeeListInfo[]) {
        this.selectedUser$.next(User);
    }

    public getSelectedUser(): Observable<EmployeeListInfo[]> {
        return this.selectedUser$.asObservable();
    }
}
