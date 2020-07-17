import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/service/login.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admins } from 'src/app/shared/models/admins';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: LoginService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  admin: Admins;
  userDetails = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.pattern("^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#*?&]{8,}$")])
  });
  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem("admin"))) {
      this.authService.isLoggedIn = true;
      this.router.navigateByUrl("/adminpanel")
    }
  }

  get email() {
    return this.userDetails.get("email");
  }

  get password() {
    return this.userDetails.get("password");
  }

  onSubmit() {
    this.admin = new Admins(this.userDetails.value.email, null, null, this.userDetails.value.password);
    this.userService.loginUser(this.admin).subscribe(
      data => {
        if (data.success === true) {
          this.toastr.success("Logged-in Successfully!");
          this.authService.isUserLoggedIn = data.data;
          localStorage.setItem("admin", JSON.stringify(this.admin.email));
          this.router.navigateByUrl("/adminpanel");
        }
      }, error => {
        if (error.error.success === false) {
          this.toastr.error("Invalid email or password! Try again!");
        }
      }

    );
  }

}
