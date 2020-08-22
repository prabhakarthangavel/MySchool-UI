import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../Constants/API.const';
import { MOCK } from '../Constants/MOCK.const';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient, private _router: Router) { }

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

  isStudent(): boolean {
    if ((new JwtHelperService().decodeToken(localStorage.getItem('token')).role == 'STUDENT')) {
      return true;
    }
    return false;
  }

  isTeacher(): boolean {
    if ((new JwtHelperService().decodeToken(localStorage.getItem('token')).role == 'TEACHER')) {
      return true;
    }
    return false;
  }

  getStudentId(): string {
    return new JwtHelperService().decodeToken(localStorage.getItem('token')).sub;
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getUserName(): string {
    if (localStorage.getItem('token')) {
      return new JwtHelperService().decodeToken(localStorage.getItem('token')).name;
    }
  }
}
