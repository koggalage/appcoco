import { Injectable } from '@angular/core';
import { Login, User } from '../login-model';
import { BaseDataService } from '../../core/app-service/base-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLoginUrl = 'Login/';

  constructor(
    private baseDataService: BaseDataService
  ) { }

  public signIn(body: Login): Observable<User> {
    return this.baseDataService.makePostCall(`${this.apiLoginUrl}${'signin'}`, body)
  }

}
