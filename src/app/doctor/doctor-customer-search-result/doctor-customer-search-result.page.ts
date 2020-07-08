import { Component, OnInit } from '@angular/core';
import { CustomerUIService } from '../../customer/customer-ui.service';
import { CustomerInfo } from '../../customer/customer-model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-customer-search-result',
  templateUrl: './doctor-customer-search-result.page.html',
  styleUrls: ['./doctor-customer-search-result.page.scss'],
})
export class DoctorCustomerSearchResultPage implements OnInit {

  public customerInfo: CustomerInfo[];
  public user: any;
  private baseUrl: string = environment.host;
  public isCustomersNotFound: boolean = false;

  constructor(
    private customerUIService: CustomerUIService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.customerInfo = this.customerUIService.retrieveSearchedCustomers();
    if (this.customerInfo.length == 0) {
      this.isCustomersNotFound = true;
    }
  }

  redirectCustomer(customer: CustomerInfo) {
    this.customerUIService.setCustomerId(customer.CustomerId);

    if (customer.SignatureURL != "") {
      customer.SignatureURL = this.baseUrl + "UserImages/Signatures/" + customer.SignatureURL + ".jpg";
    }
    this.customerUIService.setSelectedCustomer(customer);

    if (this.user.UserType == "Doctor") {
      this.router.navigate(['/history-list']);
    } else {
      if (customer.FullName == null ||
        customer.MobileNo.replace(/\s/g, "") == "" ||
        customer.Email == null ||
        customer.SignatureURL == null) {
        this.router.navigate(['/customer-info']);
      } else if (!customer.IsFilledInitConcern) {
        this.router.navigate(['/init-concent']);
      } else {
        this.router.navigate(['/daily-concent']);
      }

    }
  }

}
