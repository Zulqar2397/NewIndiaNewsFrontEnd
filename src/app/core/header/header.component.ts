import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NewsappService } from '../service/newsapp.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  flag: boolean = false;
  loggedInUser;
  userName;
  constructor(private authService: AuthService, private router: Router, private newsService: NewsappService) { }
  ngDoCheck(): void {
    if (JSON.parse(localStorage.getItem("admin"))) {
      this.loggedInUser = JSON.parse(localStorage.getItem("admin"))
      this.userName = this.loggedInUser.slice(0, this.loggedInUser.indexOf('@'));
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

  selectedCategory(categoryName: string) {
    this.newsService.sendSelectedCategoryName(categoryName);
    this.redirectTo("/category")
  }

  redirectTo(uri) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
