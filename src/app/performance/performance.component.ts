import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../Models/Message.interface';
import { Response } from '../Constants/Response.const';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  public subscription: Subscription;
  public examList = ['Term 1', 'Quearterly', 'Term 2', 'Halfyearly', 'Term 3', 'Final Exam'];
  public subList = [];
  public searchResult = [];
  public notFound: boolean;
  public performanceForm: FormGroup = this.fb.group({
    studentId: ['', Validators.required],
    exam: ['', Validators.required],
    tamil: [''],
    english: [''],
    maths: [''],
    social: [''],
    science: [''],
    physics: [''],
    chemistry: [''],
    biology: [''],
    computer: ['']
  });

  constructor(public _navBar: NavBarService, private fb: FormBuilder, private _service: CommonService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._navBar.setHide();
    this._navBar.setTitle("Performance");
  }

  // addSubjects(subject){
  //   (this.performanceForm.get('subjects') as FormArray).push(new FormControl(subject));
  // }

  get studentId() {
    return this.performanceForm.get('studentId');
  }

  get exam() {
    return this.performanceForm.get('exam');
  }

  valueEnter(value) {
    this.notFound = false;
    if (value.length >= 3) {
      this.subscription = this._service.getStudents(value).subscribe(
        response => {
          if (response.status == 200 && response.body.length >= 1) {
            if (response.body.length == 1) {
              let sId = response.body[0].clas;
              this.subscription = this._service.getSection(sId).subscribe(
                data => {
                  if (data.body.subjects) {
                    this.subList = data.body.subjects;
                  }
                });
            }
          } else {
            this.notFound = true;
          }
        });
    }
  }

  submit() {
    console.log(this.performanceForm.value)
  }

}
