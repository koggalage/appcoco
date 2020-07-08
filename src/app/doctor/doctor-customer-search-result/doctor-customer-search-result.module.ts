import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DoctorCustomerSearchResultPage } from './doctor-customer-search-result.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorCustomerSearchResultPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorCustomerSearchResultPage]
})
export class DoctorCustomerSearchResultPageModule {}
