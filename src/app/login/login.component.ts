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
  constructor(private fb: FormBuilder, private _loginService: LoginService, private _snackBar: MatSnackBar, private _router: Router) {
  }

  ngOnInit() {
    if(this._loginService.isAuthenticated()) {
      this._router.navigate(['/landing']);
    }
  }

  login() {
    const credentials = {
      username: this.loginForm.value.user_id,
      password: this.loginForm.value.password
    }
    this.spinner = true;
    this.subscription = this._loginService.authenticate(credentials).subscribe(
      response => {
        this.spinner = false;
        if (response.status == 200) {
          if (response.body.jwt == null) {
            this._snackBar.open("Invalid Credentials!! Try Again.", "Close", {
              duration: 5000,
              verticalPosition: 'bottom'
            });
          } else {
            localStorage.setItem('token', response.body.jwt);
            this._router.navigate(['/landing']);
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
