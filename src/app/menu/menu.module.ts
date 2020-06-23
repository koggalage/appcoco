import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      //{ path: 'login', loadChildren: '../auth/login/login.module#LoginPageModule' },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'customer-search', loadChildren: '../customer/customer-search/customer-search.module#CustomerSearchPageModule' },
      { path: 'customer-registration', loadChildren: '../customer/customer-registration/customer-registration.module#CustomerRegistrationPageModule' },
      { path: 'daily-concent', loadChildren: '../concent/daily-concent/daily-concent.module#DailyConcentPageModule' },
      { path: 'init-concent', loadChildren: '../concent/init-concent/init-concent.module#InitConcentPageModule' },
      { path: 'daily-update', loadChildren: '../treatment/daily-update/daily-update.module#DailyUpdatePageModule' },
      { path: 'history-list', loadChildren: '../history/history-list/history-list.module#HistoryListPageModule' },
      { path: 'history-details', loadChildren: '../history/history-details/history-details.module#HistoryDetailsPageModule' },
      { path: 'customer-info', loadChildren: '../customer/customer-info/customer-info.module#CustomerInfoPageModule' }
    ]
  },
  {
    path: '',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
