import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DoctorCustomerSearchPage } from './doctor-customer-search.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorCustomerSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorCustomerSearchPage]
})
export class DoctorCustomerSearchPageModule {}
