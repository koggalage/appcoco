import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InitConcentPage } from './init-concent.page';
import { CustomerDataService } from '../../customer/customer-data-service';
import { ConcentDataService } from '../concent-data-service';
import { SignaturePadModule } from 'angular2-signaturepad';
import { EmployeeDataService } from 'src/app/employee/employee-data-service';

const routes: Routes = [
  {
    path: '',
    component: InitConcentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SignaturePadModule
  ],
  providers: [
    CustomerDataService,
    ConcentDataService,
    EmployeeDataService
  ],
  declarations: [InitConcentPage]
})
export class InitConcentPageModule { }
