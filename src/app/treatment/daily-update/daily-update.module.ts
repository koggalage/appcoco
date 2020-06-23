import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DailyUpdatePage } from './daily-update.page';
import { CustomerDataService } from '../../customer/customer-data-service';
import { TreatmentDataService } from '../treatment-data-service';

const routes: Routes = [
  {
    path: '',
    component: DailyUpdatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DailyUpdatePage],
  providers: [CustomerDataService, TreatmentDataService]
})
export class DailyUpdatePageModule { }
