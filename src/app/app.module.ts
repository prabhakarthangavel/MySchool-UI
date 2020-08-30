import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { CardsComponent } from './cards/cards.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FooterComponent } from './footer/footer.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MessagesComponent } from './messages/messages.component';
import { PerformanceComponent } from './performance/performance.component';
import { HolidayComponent } from './holiday/holiday.component';
import { InterceptorService } from './Shared/Interceptor.service';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandingComponent,
    LoginComponent,
    CardsComponent,
    AttendanceComponent,
    FooterComponent,
    AssignmentsComponent,
    MessagesComponent,
    PerformanceComponent,
    HolidayComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
