import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from '../Constants/API.const';
import { MOCK } from '../Constants/MOCK.const';

@Injectable({
  providedIn: 'root'
})
export class CommonService { 

  constructor(private _http: HttpClient) { }

  setAttendance(attendance): Observable<any> {
    return this._http.post<any>(MOCK.SET_ATTENDANCE,attendance,{observe: 'response'});
  }
}
