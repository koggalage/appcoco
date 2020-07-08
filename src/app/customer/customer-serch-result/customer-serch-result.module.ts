import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerSerchResultPage } from './customer-serch-result.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSerchResultPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerSerchResultPage]
})
export class CustomerSerchResultPageModule {}
