import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './core/news/news.component';


const routes: Routes = [
  {
    path: "signup",
    loadChildren: ()=>
    import("./modules/login/login.module").then(mod=>mod.LoginModule)
  },
  {
    path: "admin",
    loadChildren: ()=>
    import("./modules/admin/admin.module").then(mod=>mod.AdminModule)
  },
  {
    path: "",
    component: NewsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
