import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from '../Constants/API.const';
import { MOCK } from '../Constants/MOCK.const';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private _http: HttpClient) { }

  getWelcome():Observable<any>{
    return this._http.get<any>(MOCK.welcome);
  }
}
