import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDataService } from '../customer-data-service';
import { IonicModule } from '@ionic/angular';

import { CustomerInfoPage } from './customer-info.page';
import { SignaturePadModule } from 'angular2-signaturepad';

const routes: Routes = [
  {
    path: '',
    component: CustomerInfoPage
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
  declarations: [CustomerInfoPage],
  providers: [CustomerDataService]
})
export class CustomerInfoPageModule { }
