import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public welcome: string;

  constructor(private _router: Router,
    private _navBar: NavBarService, public _loginService: LoginService) {
    this._navBar.setShow();
    this._navBar.title = "St Joseph School";
  }

  ngOnInit() {
  }

  clickHandle(page) {
    this._router.navigate(['/', page]);
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
