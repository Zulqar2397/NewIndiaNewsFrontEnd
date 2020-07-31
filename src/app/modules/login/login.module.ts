



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ParentComponent } from './parent/parent.component';
import { LoginComponent } from './parent/login/login.component';
import { SignUpComponent } from './parent/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './parent/auth.guard';


@NgModule({
  declarations: [ParentComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [ParentComponent]
})
export class LoginModule {
}
