import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public subscription: Subscription;
  public loginForm: FormGroup = this.fb.group({
    user_id: [''],
    password: ['']
  });
  constructor(private fb: FormBuilder, private _service: LoginService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {

  }

  login() {
    console.log(this.loginForm.value);
    const credentials = {
      username: this.loginForm.value.user_id,
      password: this.loginForm.value.password
    } 
    this.subscription = this._service.authenticate(credentials).subscribe(
      response => {
        if (response.status == 200) {
          console.log("response",response);
        }
      });
  }
}
