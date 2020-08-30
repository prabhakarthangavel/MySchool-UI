import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API } from '../Constants/API.const';
import { MOCK } from '../Constants/MOCK.const';
import { Message } from '../Models/Message.interface';
import { Performance } from '../Models/Performance.interface';
import { Attendance } from '../Models/Attendace.interface';
import { Assignments } from '../Models/Assigments.interface';
import { Holiday } from '../Models/Holiday.interface';

import { flatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http: HttpClient) { }

  setAttendance(attendance): Observable<any> {
    return this._http.post<any>(API.SET_ATTENDANCE, attendance, { observe: 'response' });
  }

  getClasses(): Observable<any> {
    return this._http.get<any>(API.GET_CLASSES, { observe: 'response' });
  }

  getSection(classes): Observable<any> {
    return this._http.get<any>(API.GET_SECTION + '/' + classes, { observe: 'response' })
  }

  setAssignments(assignment): Observable<any> {
    return this._http.post<any>(API.SET_ASSIGNMENT, assignment, { observe: 'response' });
  }

  setMessages(message: Message): Observable<any> {
    return this._http.post<any>(API.SET_MESSAGES, message, { observe: 'response' });
  }

  getStudents(studentId): Observable<any> {
    return this._http.get<any>(API.GET_STUDENTS + '/' + studentId, { observe: 'response' });
  }

  setPerformance(performance: Performance): Observable<any> {
    return this._http.post<any>(API.SET_PERFORMANCE, performance, { observe: 'response' })
  }

  setHoliday(holiday): Observable<any> {
    return this._http.post<any>(API.SET_HOLIDAY, holiday, { observe: 'response' });
  }

  getAttendance(student_id): Observable<HttpResponse<Attendance[]>> {
    return this._http.get<Attendance[]>(API.GET_ATTENDANCE + '/' + student_id, { observe: 'response' });
  }

  getAssignments(student_id): Observable<HttpResponse<Assignments[]>> {
    return this._http.get<Assignments[]>(API.GET_ASSIGNMENTS + '/' + student_id, { observe: 'response' });
  }

  getMessageClass(student_id): Observable<any> {
    return this._http.get<any>(API.GET_STUDENT_CLASS + '/' + student_id, { observe: 'response' }).pipe(
      flatMap(clas => this._http.get<any>(API.GET_MESSAGE_CLASS + '/' + clas.body, { observe: 'response' })));
  }

  getMessageById(student_id): Observable<any> {
    return this._http.get<any>(API.GET_MESSAGE_BYID + '/' + student_id, { observe: 'response' });
  }

  getHolidayList(): Observable<any> {
    return this._http.get<Holiday>(API.GET_HOLIDAYS, { observe: 'response' });
  }

  getPerformances(student_id): Observable<HttpResponse<Performance[]>> {
    return this._http.get<Performance[]>(API.GET_PERFORMANCES + '/' + student_id, { observe: 'response' });
  }
}
