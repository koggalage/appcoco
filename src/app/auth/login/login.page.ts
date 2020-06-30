import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from './login.service';
import { Login, User } from '../login-model';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { first, takeUntil } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { EmployeeDataService } from 'src/app/employee/employee-data-service';
import { Subject } from 'rxjs';
import { EmployeeListInfo } from 'src/app/employee/employee-model';
import { EmployeeUIService } from 'src/app/employee/employee-ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  public login = new Login();
  public user = new User();
  public isInvalidLogin: boolean = false;
  private ngUnsubscription = new Subject();

  constructor(
    private loginService: LoginService,
    private employeeDataService: EmployeeDataService,
    private employeeUIService: EmployeeUIService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      //this.router.navigate(['/login']);
      localStorage.setItem('isLoggedIn', 'true');
    }
  }

  ngOnInit() {
  }

  signIn() {

    this.authenticationService.login(this.login.Username, this.login.Password)
      .pipe(first())
      .subscribe(
        data => {
          this.isInvalidLogin = false;
          // this.getEmployeeList(6);
          // this.getUserList('Doctor');

          this.router.navigateByUrl('/home');
        },
        error => {
          this.isInvalidLogin = true;
          console.log(error);
        });

  }


  // private getEmployeeList(designationId: number) {
  //   this.employeeDataService.getEmployeeList(designationId)
  //     .pipe(takeUntil(this.ngUnsubscription))
  //     .subscribe((employeeListResponse: EmployeeListInfo[]) => {
  //       this.employeeUIService.setSelectedEmployees(employeeListResponse);
  //     })
  // };

  // private getUserList(designation: string) {
  //   this.employeeDataService.getUserList(designation)
  //     .pipe(takeUntil(this.ngUnsubscription))
  //     .subscribe((userListResponse: EmployeeListInfo[]) => {
  //       this.employeeUIService.setSelectedUser(userListResponse);
  //     })
  // };

}
