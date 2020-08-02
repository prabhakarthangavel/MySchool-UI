import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public msgStudent: boolean;
  public msgClass: boolean;
  public messageForm: FormGroup = this.fb.group({
    messageTo: ['', Validators.required],
    studentId: [''],
    class: [''],
    message: ['', [Validators.required, Validators.maxLength(1000)]]
  });
  public messageTypes = ['Student', 'Class'];
  public allClass = [];
  public descriptionLength: number = 0;
  public responseGot: boolean;
  public required: boolean;
  constructor(public _navBar: NavBarService, private fb: FormBuilder, private _service: CommonService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._navBar.setHide();
    this._navBar.setTitle("Messages");
    this.subscription = this._service.getClasses().subscribe(
      response => {
        if (response.status == 200) {
          this.allClass = response.body;
        }
      });
  }

  get messageTo(){
    return this.messageForm.get('messageTo');
  }

  get studentId(){
    return this.messageForm.get('studentId');
  }
  
  get class(){
    return this.messageForm.get('class');
  }

  get message(){
    return this.messageForm.get('message');
  }

  messageSelect(event){
    this.msgStudent = false;
    this.msgClass = false;
    if(event == 'Student'){
      this.msgStudent = true;
    }else if (event == 'Class'){
      this.msgClass = true;
    }
  }

  submit(){
    console.log("response",this.messageForm.value);
    this.required = false;
    let msg = this.messageForm.value.studentId;
    let clas = this.messageForm.value.msgClass;
    if((msg == null || msg == "") && (clas == null || clas == "")){
      this.required = true;
    }
  }
  
  onChange(event){
    this.descriptionLength = event.target.value.length + 1;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
