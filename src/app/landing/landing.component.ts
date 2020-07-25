import { Component, OnInit } from '@angular/core';
import { LandingService } from './landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public welcome:string;

  constructor(private _landingService:LandingService) { }

  ngOnInit() {
    this._landingService.getWelcome().subscribe(
      response => {
        this.welcome = response.status;
      }
    )
  }

}
