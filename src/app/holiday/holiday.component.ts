import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Response } from '../Constants/Response.const';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public spinner: boolean;
  public dataSource = [];
  public displayedColumns = ['holiday', 'event'];
  public holidayForm: FormGroup = this.fb.group({
    holidays: this.fb.array([this.initItems()])
  });

  constructor(public _navBar: NavBarService, private fb: FormBuilder, private _service: CommonService, private _snackBar: MatSnackBar, public _loginService: LoginService) {
    this._navBar.setHide();
    this._navBar.setTitle("Holiday Calendar");
  }

  get formArray() {
    return this.holidayForm.get('holidays') as FormArray;
  }

  initItems() {
    return this.fb.group({
      holidayDate: ['', Validators.required],
      event: ['', Validators.required]
    })
  }

  addItems() {
    this.formArray.push(this.initItems());
  }

  deleteItems() {
    this.formArray.removeAt(this.formArray.length - 1);
  }

  submit() {
    let holiday = [];
    let event = [];
    for (let i = 0; i < this.holidayForm.value.holidays.length; i++) {
      holiday.push(this.holidayForm.value.holidays[i].holidayDate);
      event.push(this.holidayForm.value.holidays[i].event);
    }
    const holidays = {
      holiday: holiday,
      event: event
    }
    this.spinner = true;
    this._service.setHoliday(holidays).subscribe(
      response => {
        this.spinner = false;
        if (response.status == 200) {
          this._snackBar.open(response.body.status, "Close", {
            duration: 5000,
            verticalPosition: 'bottom'
          });
          if (response.body.status == Response.Saved) {
            this.holidayForm.reset();
            while(this.formArray.length != 0){
              this.formArray.removeAt(0);
            }
          }
        }
      });
  }

  ngOnInit() {
    if (this._loginService.isStudent()) {
      this.spinner = true;
      this.subscription = this._service.getHolidayList().subscribe(
        response => {
          this.spinner = false;
          if(response.status == 200){
            this.dataSource = response.body;
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
