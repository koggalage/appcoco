import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TreatmentDataService } from '../../treatment/treatment-data-service';
import { IonicModule } from '@ionic/angular';

import { HistoryDetailsPage } from './history-details.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoryDetailsPage],
  providers: [TreatmentDataService]
})
export class HistoryDetailsPageModule { }
