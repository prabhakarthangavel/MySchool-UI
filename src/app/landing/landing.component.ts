import { Component, OnInit } from '@angular/core';
import { LandingService } from './landing.service';
import { Router } from '@angular/router';
import { NavBarService } from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public welcome: string;

  constructor(private _landingService: LandingService, private _router: Router,
    private _navBar: NavBarService) { 
      this._navBar.setShow();
      this._navBar.title = "My School";
    }

  ngOnInit() {
    this._landingService.getWelcome().subscribe(
      response => {
        this.welcome = response.status;
      }
    )
  }

  clickHandle(page) {
    this._router.navigate(['/attendance']);
  }

}
