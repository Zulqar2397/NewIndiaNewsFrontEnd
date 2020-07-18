import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './core/news/news.component';
import { NewsDetailsComponent } from './core/news-details/news-details.component';


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
  },
  {
    path: "category",
    component: NewsDetailsComponent
  }
];
//scrollPositionRestoration makes webpage to load from top
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true,scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
