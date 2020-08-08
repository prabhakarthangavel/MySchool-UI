import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MessagesComponent } from './messages/messages.component';
import { PerformanceComponent } from './performance/performance.component';
import { HolidayComponent } from './holiday/holiday.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'holiday', component: HolidayComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
