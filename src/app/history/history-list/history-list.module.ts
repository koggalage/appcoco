import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TreatmentDataService } from '../../treatment/treatment-data-service';
import { IonicModule } from '@ionic/angular';
import { HistoryListPage } from './history-list.page';
import { MatExpansionModule } from '@angular/material/expansion';


const routes: Routes = [
  {
    path: '',
    component: HistoryListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoryListPage],
  providers: [TreatmentDataService]
})
export class HistoryListPageModule { }
