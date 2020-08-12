import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterContentChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavBarService } from './nav-bar.service';
import { Location } from '@angular/common';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy, AfterContentChecked {
  public mobileQuery: MediaQueryList;
  public _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private _router: Router,
    public _navBar: NavBarService, private ref: ChangeDetectorRef, private _location: Location, private _loginService: LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  backClicked() {
    this._location.back();
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
