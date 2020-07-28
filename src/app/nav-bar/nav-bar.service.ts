import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  public navFlag: boolean = true;
  public title: string = "My School";

  constructor() { }

  setHide() {
    this.navFlag = false;
  }
  setShow() {
    this.navFlag = true;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
}
