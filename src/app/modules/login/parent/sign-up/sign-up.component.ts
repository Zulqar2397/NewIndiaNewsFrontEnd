import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from 'src/app/core/service/login.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Admins } from 'src/app/shared/models/admins';
import { MustMatch } from '../../validator'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, DoCheck {

  constructor(private userService: LoginService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  admin: Admins;
  passwordStatus: boolean;
  userDetails = this.formBuilder.group({
    firstName: ["", [Validators.required, Validators.pattern("^[A-Za-z\\s]+$")
    ]
    ],
    lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z\\s]+$")
    ]
    ],
    email: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.pattern(
      "^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#*?&]{8,}$"
    )]
    ],
    confirmPassword: ["", [Validators.required, Validators.pattern(
      "^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#*?&]{8,}$"
    )
    ]
    ]

  }, {
    validator: MustMatch("password", "confirmPassword")
  }
  );


  ngDoCheck(): void {
    if (this.userDetails.controls.password.value === this.userDetails.controls.confirmPassword.value) {
      this.passwordStatus = true;
    }
    else {
      this.passwordStatus = false;
    }
  }

  ngOnInit(): void {
    this.passwordStatus = false;
    if (JSON.parse(localStorage.getItem("admin"))) {
      this.authService.isLoggedIn = true;
      this.router.navigateByUrl("/")
    }
  }
  get firstName() {
    return this.userDetails.get("firstName");
  }

  get lastName() {
    return this.userDetails.get("lastName");
  }

  get email() {
    return this.userDetails.get("email");
  }

  get password() {
    return this.userDetails.get("password");
  }
  onSubmit() {
    this.admin = new Admins(this.userDetails.value.email, this.userDetails.value.firstName, this.userDetails.value.lastName, this.userDetails.value.password);
    this.userService.registerUser(this.admin).subscribe(
      data => {
        if (data.success === true) {
          this.toastr.success("Sign-up Successfully!");
          this.authService.isUserLoggedIn = data.data;
          localStorage.setItem("admin", JSON.stringify(this.admin.email));
          this.router.navigateByUrl("/admin");
        }
      }, error => {
        if (error.error.success === false) {
          this.toastr.error("The entered email address already exists!");
        }
      }

    );
  }
}
