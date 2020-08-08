import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingService } from './landing.service';
import { Router } from '@angular/router';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public welcome: string;

  constructor(private _landingService: LandingService, private _router: Router,
    private _navBar: NavBarService) { 
      this._navBar.setShow();
      this._navBar.title = "St Joseph School";
    }

  ngOnInit() {
    this.subscription = this._landingService.getWelcome().subscribe(
      response => {
        this.welcome = response.status;
      }
    )
  }

  clickHandle(page) {
    this._router.navigate(['/',page]);
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
