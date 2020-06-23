import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TreatmentHistoryPage } from './treatment-history.page'; 
import { TreatmentDataService } from '../treatment-data-service';

const routes: Routes = [
  {
    path: '',
    component: TreatmentHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TreatmentHistoryPage],
  providers: [TreatmentDataService]
})
export class TreatmentHistoryPageModule {}
