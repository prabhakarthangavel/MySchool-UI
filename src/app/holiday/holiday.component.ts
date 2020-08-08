import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Response } from '../Constants/Response.const';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public responseGot: boolean;
  public holidayForm: FormGroup = this.fb.group({
    holidays: this.fb.array([this.initItems()])
  });

  constructor(public _navBar: NavBarService, private fb: FormBuilder, private _service: CommonService, private _snackBar: MatSnackBar) {
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
    console.log("value", this.holidayForm.value.holidays[0].holidayDate);
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
    this.responseGot = true;
    this._service.setHoliday(holidays).subscribe(
      response => {
        this.responseGot = false;
        if (response.status == 200) {
          this._snackBar.open(response.body.status, "Close", {
            duration: 5000,
            verticalPosition: 'bottom'
          });
          if(response.body.status == Response.Saved){
            this.holidayForm.reset();
          }
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
