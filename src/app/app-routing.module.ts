import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MessagesComponent } from './messages/messages.component';
import { PerformanceComponent } from './performance/performance.component';
import { HolidayComponent } from './holiday/holiday.component';
import { AuthGuardService } from './activates/auth-guard.service';

const routes: Routes = [
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuardService] },
  { path: 'assignments', component: AssignmentsComponent, canActivate: [AuthGuardService] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService] },
  { path: 'performance', component: PerformanceComponent, canActivate: [AuthGuardService] },
  { path: 'holiday', component: HolidayComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
