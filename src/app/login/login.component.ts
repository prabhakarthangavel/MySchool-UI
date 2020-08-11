import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public subscription: Subscription;
  public spinner: boolean;
  public loginForm: FormGroup = this.fb.group({
    user_id: [''],
    password: ['']
  });
  constructor(private fb: FormBuilder, private _service: LoginService, private _snackBar: MatSnackBar, private _router: Router) {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.value);
    const credentials = {
      username: this.loginForm.value.user_id,
      password: this.loginForm.value.password
    }
    this.spinner = true;
    this.subscription = this._service.authenticate(credentials).subscribe(
      response => {
        this.spinner = false;
        if (response.status == 200 && response.body.jwt) {
          localStorage.setItem('token', response.body.jwt);
          this._router.navigate(['/landing']);
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
