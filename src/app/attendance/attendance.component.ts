import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  constructor(public _navBar: NavBarService) { 
    this._navBar.setHide();
    this._navBar.setTitle("Attendance");
  }

  ngOnInit() {
  }

}
