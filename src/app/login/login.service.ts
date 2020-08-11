import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../Constants/API.const';
import { MOCK } from '../Constants/MOCK.const';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }

  authenticate(credentials): Observable<any> {
    return this._http.post<any>(MOCK.AUTHENTICATE, credentials, { observe: 'response' });
  }

  isAuthenticated() {
    if (!localStorage.getItem('token')) {
      return false;
    } else {
      if ((new JwtHelperService().decodeToken(localStorage.getItem('token'))).name) {
        return true;
      }
    }
  }

  getUserName(){
    if (localStorage.getItem('token')){
      return new JwtHelperService().decodeToken(localStorage.getItem('token')).name;
    }
  }
}
