import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Response } from '../Constants/Response.const';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public assignmentForm: FormGroup = this.fb.group({
    class: ['', Validators.required],
    section: ['', Validators.required],
    subject: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(3500)]],
    dueDate: ['', Validators.required]
  });
  public allClass = [];
  public allSection = [];
  public allSubjects = [];
  public spinner: boolean;
  public date: string;
  public dateInvalid: boolean;
  public descriptionLength: number = 0;
  constructor(public _navBar: NavBarService, private fb: FormBuilder, private _service: CommonService, private _snackBar: MatSnackBar, private _loginService: LoginService) {
    this._navBar.setHide();
    this._navBar.setTitle("Assignments");
    // this.assignmentForm.get('description').valueChanges.subscribe(
    //   value => {
    //     this.descriptionLength.next(value.length);
    //   }
    // )
  }

  ngOnInit() {
    if (this._loginService.isTeacher()) {
      this.subscription = this._service.getClasses().subscribe(
        response => {
          if (response.status == 200) {
            this.allClass = response.body;
          }
        });
    }
    if(this._loginService.isStudent()){
      let studentId = this._loginService.getStudentId();
      this.subscription = this._service.getAssignments(studentId).subscribe(
        response => {
          console.log("resonse",response);
        }
      )
    }
  }

  get class() {
    return this.assignmentForm.get('class');
  }

  get section() {
    return this.assignmentForm.get('section');
  }

  get subject() {
    return this.assignmentForm.get('subject');
  }

  get description() {
    return this.assignmentForm.get('description');
  }

  get dueDate() {
    return this.assignmentForm.get('dueDate');
  }

  classSelect(event) {
    this.subscription = this._service.getSection(event).subscribe(
      response => {
        if (response.status == 200) {
          this.allSection = response.body.section;
          this.allSubjects = response.body.subjects;
        }
      });
  }

  submit() {
    this.spinner = true;
    this.dateInvalid = false;
    var current_timestamp = new Date();
    if (current_timestamp > this.assignmentForm.value.dueDate) {
      this.spinner = false;
      this.dateInvalid = true;
    } else {
      // let dt = this.assignmentForm.value.dueDate.toString().split(' ');
      // this.date = dt[2] + '/' + dt[1] + '/' + dt[3];
      const assignment = {
        clas: this.assignmentForm.value.class,
        section: this.assignmentForm.value.section,
        subject: this.assignmentForm.value.subject,
        description: this.assignmentForm.value.description,
        dueDate: this.assignmentForm.value.dueDate
      }
      this.subscription = this._service.setAssignments(assignment).subscribe(
        response => {
          this.spinner = false;
          if (response.status == 200) {
            this._snackBar.open(response.body.status, "Close", {
              duration: 5000,
              verticalPosition: 'bottom'
            });
            if (response.body.status == Response.Submited) {
              this.assignmentForm.reset();
            }
          }
        });
    }
  }

  onChange(event) {
    this.descriptionLength = event.target.value.length;
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
