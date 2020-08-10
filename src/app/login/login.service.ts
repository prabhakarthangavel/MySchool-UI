import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../Constants/API.const';
import { MOCK } from '../Constants/MOCK.const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  authenticate(credentials): Observable<any> {
    return this._http.post<any>(MOCK.AUTHENTICATE, credentials, { observe: 'response' });
  }
}
