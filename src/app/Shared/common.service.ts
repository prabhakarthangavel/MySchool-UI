import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from '../Constants/API.const';
import { MOCK } from '../Constants/MOCK.const';
import { AllClass } from '../Models/AllClass.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http: HttpClient) { }

  setAttendance(attendance): Observable<any> {
    return this._http.post<any>(MOCK.SET_ATTENDANCE, attendance, { observe: 'response' });
  }

  getClasses(): Observable<any> {
    return this._http.get<any>(MOCK.GET_CLASSES, { observe: 'response' });
  }

  getSection(classes): Observable<any> {
    return this._http.get<any>(MOCK.GET_SECTION + '/' + classes, { observe: 'response' })
  }

  setAssignments(assignment): Observable<any> {
    return this._http.post<any>(MOCK.SET_ASSIGNMENT, assignment, { observe: 'response' });
  }
}
