import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;

  constructor() { }

  set isUserLoggedIn(check) {
    this.isLoggedIn = check;
  }

  get isUserLoggedIn() {
    return this.isLoggedIn;
  }
  ngOnInit() {
    this.isLoggedIn = false;
  }
}
