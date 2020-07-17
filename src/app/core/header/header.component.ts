import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  flag: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }
  ngDoCheck(): void {
    if (JSON.parse(localStorage.getItem("admin"))) {
      this.flag = true;
      this.authService.isUserLoggedIn = true;
    }
  }
  ngOnInit(): void {
  }
  logout() {
    this.authService.isUserLoggedIn = false;
    this.flag = false;
    localStorage.clear();
    this.router.navigateByUrl("/");
  }
}
