import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './parent/login/login.component'
import { SignUpComponent } from './parent/sign-up/sign-up.component'
import { AuthGuard } from './parent/auth.guard'

const routes: Routes = [
  {
    path: "",
    component: SignUpComponent
  },
  {
    path: "login",
    component: LoginComponent

  },
  {
    path: "signup", component: SignUpComponent, canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
