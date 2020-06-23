import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: './menu/menu.module#MenuPageModule'
  },
  { path: 'image-modal', loadChildren: './image-modal/image-modal.module#ImageModalPageModule' },
  // { path: 'employee', loadChildren: './employee/employee.module#EmployeePageModule' },
  // { path: 'employee-info', loadChildren: './employee/employee-info/employee-info.module#EmployeeInfoPageModule' },


  // { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  // { path: 'history-list', loadChildren: './history/history-list/history-list.module#HistoryListPageModule' },
  // { path: 'history-details', loadChildren: './history/history-details/history-details.module#HistoryDetailsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
