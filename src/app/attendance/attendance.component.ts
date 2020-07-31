import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  public totalDays: number;
  public present: boolean;
  public responseGot: boolean;
  public studentForm: FormGroup = this.fb.group({
    studentId: ['', Validators.required],
    month: ['', Validators.required],
    working_days: ['', [Validators.required, Validators.min(1), Validators.max(31), Validators.pattern("^[0-9]*$")]],
    present_days: ['', [Validators.required, Validators.min(1), Validators.max(31), Validators.pattern("^[0-9]*$")]]
  });
  public allMonths = [{ 'month': 'January' }, { 'month': 'February' }, { 'month': 'March' }, { 'month': 'April' }, { 'month': 'May' }, { 'month': 'June' }, { 'month': 'July' }, { 'month': 'August' }, { 'month': 'September' }, { 'month': 'October' }, { 'month': 'November' }, { 'month': 'December' }];

  constructor(public _navBar: NavBarService, private fb: FormBuilder, private _service: CommonService, private _snackBar: MatSnackBar) {
    this._navBar.setHide();
    this._navBar.setTitle("Attendance");
  }

  ngOnInit() {
  }

  get studentId() {
    return this.studentForm.get('studentId');
  }

  get month() {
    return this.studentForm.get('month');
  }
  get working_days() {
    return this.studentForm.get('working_days');
  }

  get present_days() {
    return this.studentForm.get('present_days');
  }

  submit() {
    console.log("form", this.studentForm.value.month, this.studentForm.value.working_days);
    if (this.studentForm.value.present_days > this.studentForm.value.working_days) {
      this.present = true;
    } else {
      const attendanceData = {
        student_id: this.studentForm.value.studentId,
        month: this.studentForm.value.month,
        working_days: this.studentForm.value.working_days,
        present: this.studentForm.value.present_days,
        year: new Date().getFullYear()
      }
      this._service.setAttendance(attendanceData).subscribe(
        response => {
          this.responseGot = true;
          if(response.status == 200 && response.body.status){
            this._snackBar.open(response.body.status, "Close", {
              duration: 5000,
              verticalPosition: 'bottom'
            });
          }
          console.log(response);
        })
    }
  }
}