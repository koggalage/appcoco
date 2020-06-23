import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BaseDataService } from '../../core/app-service/base-data.service';
import { CustomerDataService } from '../customer-data-service';
import { IonicModule } from '@ionic/angular';
import { CustomerRegistrationPage } from './customer-registration.page';
import { SignaturePadModule } from 'angular2-signaturepad';

const routes: Routes = [
  {
    path: '',
    component: CustomerRegistrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BaseDataService,
    CustomerDataService
  ],
  declarations: [CustomerRegistrationPage]
})
export class CustomerRegistrationPageModule { }
