import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './auth/login/login.module#LoginPageModule' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'customer-search', loadChildren: './customer/customer-search/customer-search.module#CustomerSearchPageModule' },
  { path: 'image-modal', loadChildren: './image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'customer-registration', loadChildren: './customer/customer-registration/customer-registration.module#CustomerRegistrationPageModule' },
  { path: 'daily-concent', loadChildren: './concent/daily-concent/daily-concent.module#DailyConcentPageModule' },
  { path: 'init-concent', loadChildren: './concent/init-concent/init-concent.module#InitConcentPageModule' },
  { path: 'daily-update', loadChildren: './treatment/daily-update/daily-update.module#DailyUpdatePageModule' },
  { path: 'history-list', loadChildren: './history/history-list/history-list.module#HistoryListPageModule' },
  { path: 'history-details', loadChildren: './history/history-details/history-details.module#HistoryDetailsPageModule' },
  { path: 'customer-info', loadChildren: './customer/customer-info/customer-info.module#CustomerInfoPageModule' },  { path: 'customer-serch-result', loadChildren: './customer/customer-serch-result/customer-serch-result.module#CustomerSerchResultPageModule' },
  { path: 'doctor-customer-search', loadChildren: './doctor/doctor-customer-search/doctor-customer-search.module#DoctorCustomerSearchPageModule' },
  { path: 'doctor-customer-search-result', loadChildren: './doctor/doctor-customer-search-result/doctor-customer-search-result.module#DoctorCustomerSearchResultPageModule' },
  { path: 'doctor-menu', loadChildren: './doctor/doctor-menu/doctor-menu.module#DoctorMenuPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
