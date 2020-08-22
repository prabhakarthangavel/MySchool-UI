import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API } from '../Constants/API.const';
import { MOCK } from '../Constants/MOCK.const';
import { Message } from '../Models/Message.interface';
import { Performance } from '../Models/Performance.interface';
import { Attendance } from '../Models/Attendace.interface';
import { Assignments } from '../Models/Assigments.interface';
import { mergeMap, map, flatMap } from 'rxjs/operators';

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

  setMessages(message: Message): Observable<any> {
    return this._http.post<any>(MOCK.SET_MESSAGES, message, { observe: 'response' });
  }

  getStudents(studentId: number): Observable<any> {
    return this._http.get<any>(MOCK.GET_STUDENTS + '/' + studentId, { observe: 'response' });
  }

  setPerformance(performance: Performance): Observable<any> {
    return this._http.post<any>(MOCK.SET_PERFORMANCE, performance, { observe: 'response' })
  }

  setHoliday(holiday): Observable<any> {
    return this._http.post<any>(MOCK.SET_HOLIDAY, holiday, { observe: 'response' });
  }

  getAttendance(student_id): Observable<HttpResponse<Attendance[]>> {
    return this._http.get<Attendance[]>(MOCK.GET_ATTENDANCE + '/' + student_id, { observe: 'response' });
  }

  getAssignments(student_id): Observable<HttpResponse<Assignments[]>> {
    return this._http.get<Assignments[]>(MOCK.GET_ASSIGNMENTS + '/' + student_id, { observe: 'response' });
  }

  getMessageClass(student_id): Observable<any> {
    return this._http.get<any>(MOCK.GET_STUDENT_CLASS + '/' + student_id, { observe: 'response' }).pipe(
      flatMap(clas => this._http.get<any>(MOCK.GET_MESSAGE_CLASS + '/' + clas.body, { observe: 'response' })));
  }
}
