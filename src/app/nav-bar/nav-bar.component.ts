import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterContentChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavBarService } from './nav-bar.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy, AfterContentChecked {
  public mobileQuery: MediaQueryList;
  public _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher,
    public _navBar: NavBarService, private ref: ChangeDetectorRef, private _location: Location) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  backClicked(){
    this._location.back();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
