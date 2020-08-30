import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../Models/Message.interface';
import { Response } from '../Constants/Response.const';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public msgStudent: boolean;
  public msgClass: boolean;
  public searchResult = []
  public classMessage = [];
  public studentMessage = [];
  public messageForm: FormGroup = this.fb.group({
    messageTo: ['', Validators.required],
    studentId: [''],
    class: [''],
    message: ['', [Validators.required, Validators.maxLength(1000)]]
  });
  public messageTypes = ['Student', 'Class'];
  public allClass = [];
  public descriptionLength: number = 0;
  public spinner: boolean;
  public required: boolean;
  constructor(public _navBar: NavBarService, private fb: FormBuilder, private _service: CommonService, private _snackBar: MatSnackBar, private _loginService: LoginService) {
    this._navBar.setHide();
    this._navBar.setTitle("Messages");
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
    if (this._loginService.isStudent()) {
      this.spinner = true;
      let student_id = this._loginService.getStudentId();
      this.subscription = this._service.getMessageClass(student_id).subscribe(
        response => {
          this.spinner = false;
          if (response.body && response.status == 200) {
            this.classMessage = response.body;
          }
        });
      this.subscription = this._service.getMessageById(student_id).subscribe(
        response => {
          if (response.body && response.status == 200) {
            this.studentMessage = response.body;
          }
        }
      )
    }
  }

  get messageTo() {
    return this.messageForm.get('messageTo');
  }

  get studentId() {
    return this.messageForm.get('studentId');
  }

  get class() {
    return this.messageForm.get('class');
  }

  get message() {
    return this.messageForm.get('message');
  }

  messageSelect(event) {
    this.msgStudent = false;
    this.msgClass = false;
    if (event == 'Student') {
      this.msgStudent = true;
    } else if (event == 'Class') {
      this.msgClass = true;
    }
  }

  valueEnter(value) {
    this.searchResult = [];
    if (value.length >= 3) {
      this.subscription = this._service.getStudents(value).subscribe(
        response => {
          if (response.status == 200 && response.body.length >= 1) {
            for (let i = 0; i < response.body.length; i++) {
              this.searchResult.push(response.body[i].student_id + ' - ' + (response.body[i].first_name as string).toUpperCase());
            }
          }
        });
    }
  }

  submit() {
    this.required = false;
    let id;
    if (this.messageForm.value.studentId != null) {
      let split = this.messageForm.value.studentId.split(' - ');
      id = split[0];
    }
    let clas = this.messageForm.value.class;
    if (id == "" && clas == "") {
      this.required = true;
    } else {
      this.spinner = true;
      let message: Message = {
        student_id: id,
        clas: clas,
        message: this.messageForm.value.message,
        created_on: new Date(),
        created_by: this._loginService.getUserName()
      }
      this.subscription = this._service.setMessages(message).subscribe(
        response => {
          this.spinner = false;
          if (response.status == 200) {
            this._snackBar.open(response.body.status, "Close", {
              duration: 5000,
              verticalPosition: 'bottom'
            });
            if (response.body.status == Response.Message) {
              this.messageForm.reset();
            }
          }
        }
      )
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
