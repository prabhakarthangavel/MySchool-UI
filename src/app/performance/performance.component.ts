import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Performance } from '../Models/Performance.interface';
import { Response } from '../Constants/Response.const';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public examList = ['Term 1', 'Quearterly', 'Term 2', 'Halfyearly', 'Term 3', 'Final Exam'];
  public subList = [];
  public searchResult = [];
  public notFound: boolean;
  public error: boolean;
  public buttonDisable: boolean;
  public required: boolean;
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
    this.buttonDisable = false;
    this.searchResult = [];
    if (value.length >= 3) {
      this.subscription = this._service.getStudents(value).subscribe(
        response => {
          if (response.status == 200 && response.body.length >= 1) {
            for (let i = 0; i < response.body.length; i++) {
              this.searchResult.push(response.body[i].student_id + ' - ' + (response.body[i].name as string).toUpperCase());
            }
            if (response.body.length == 1) {
              let sId = response.body[0].clas;
              this.subscription = this._service.getSection(sId).subscribe(
                data => {
                  if (data.body.subjects) {
                    this.subList = data.body.subjects;
                  }
                });
            } else if (response.body.length != 1) {
              this.buttonDisable = true;
            }
          } else {
            this.notFound = true;
          }
        });
    } else {
      this.buttonDisable = true;
    }
  }

  submit() {
    this.error = false;
    let tamil = this.performanceForm.value.tamil;
    let english = this.performanceForm.value.english;
    let maths = this.performanceForm.value.math;
    let social = this.performanceForm.value.social;
    let science = this.performanceForm.value.science;
    let physics = this.performanceForm.value.physics;
    let chemistry = this.performanceForm.value.chemistry;
    let biology = this.performanceForm.value.biology;
    let computer = this.performanceForm.value.computer;
    let subjects: Performance = {
      student_id: this.performanceForm.value.studentId,
      exam: this.performanceForm.value.exam.toLowerCase(),
      tamil: tamil,
      english: english,
      maths: maths,
      social: social,
      science: science,
      physics: physics,
      chemistry: chemistry,
      biology: biology,
      computer: computer,
      year: new Date().getFullYear()
    }
    for (let i = 0; i < this.subList.length; i++) {
      if (this.subList[i] == 'tamil' && (tamil == "" || tamil > 100 || tamil < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      } else if (this.subList[i] == 'english' && (english == "" || english > 100 || english < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      } else if (this.subList[i] == 'maths' && (maths == "" || maths > 100 || maths < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      } else if (this.subList[i] == 'social' && (social == "" || social > 100 || social < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      } else if (this.subList[i] == 'science' && (science == "" || science > 100 || science < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      } else if (this.subList[i] == 'physics' && (physics == "" || physics > 100 || physics < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      } else if (this.subList[i] == 'chemistry' && (chemistry == "" || chemistry > 100 || chemistry < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      } else if (this.subList[i] == 'biology' && (biology == "" || biology > 100 || biology < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      } else if (this.subList[i] == 'computer' && (computer == "" || computer > 100 || computer < 0 || !/^\d+$/.test(tamil))) {
        this.error = true;
      }
    }
    this.required = false;
    if (!this.error) {
      this.subscription = this._service.setPerformance(subjects).subscribe(
        response => {
          if (response.status == 200) {
            this.required = true;
            this._snackBar.open(response.body.status, "Close", {
              duration: 5000,
              verticalPosition: 'bottom'
            });
            if (response.body.status == Response.Saved) {
              this.performanceForm.reset();
            }
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
