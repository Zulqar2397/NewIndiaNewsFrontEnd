import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../login/parent/auth.guard';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsPostedComponent } from './news-posted/news-posted.component';


const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "profile-details",
        pathMatch: "full",
      },
      {
        path: "profile-details",
        component: ProfileDetailsComponent
      },
      {
        path: "add-news",
        component: AddNewsComponent
      },
      {
        path: "news-posted",
        component: NewsPostedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
