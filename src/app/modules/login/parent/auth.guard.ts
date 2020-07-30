import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isUserLoggedIn === true) {
      return true;
    }
    else {
      this.route.navigateByUrl('/');
      return false;
    }
  }
}
