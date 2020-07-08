import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ComponentStatus } from '../shared/shared-model';
import { CustomerInfo } from './customer-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerUIService {

  private readonly currentlyLoadedComponent$: Subject<ComponentStatus> = new Subject();
  private readonly selectedCustomerRegNo$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private readonly selectedCustomer$: BehaviorSubject<CustomerInfo> = new BehaviorSubject<CustomerInfo>(null);
  public searchedCustomers: CustomerInfo[];

  constructor() { }

  public setLoadPanel(messageHandler: ComponentStatus) {
    this.currentlyLoadedComponent$.next(messageHandler);
  }

  public getLoadPanel() {
    return this.currentlyLoadedComponent$.asObservable();
  }

  public setCustomerId(id: string) {
    this.selectedCustomerRegNo$.next(id);
  }

  public getCustomerId(): Observable<string> {
    return this.selectedCustomerRegNo$.asObservable();
  }

  public setSelectedCustomer(Customer: CustomerInfo) {
    this.selectedCustomer$.next(Customer);
  }

  public getSelectedCustomer(): Observable<CustomerInfo> {
    return this.selectedCustomer$.asObservable();
  }

  public saveSearchedCustomers(customers: CustomerInfo[]) {
    this.searchedCustomers = customers;
  }

  public retrieveSearchedCustomers() {
    return this.searchedCustomers;
  }
}
