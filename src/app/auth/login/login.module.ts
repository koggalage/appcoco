import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { LoginService } from './login.service';
import { EmployeeDataService } from 'src/app/employee/employee-data-service';
import { EmployeeUIService } from 'src/app/employee/employee-ui.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [LoginService, EmployeeDataService, EmployeeUIService]
})
export class LoginPageModule { }
