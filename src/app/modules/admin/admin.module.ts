import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsPostedComponent } from './news-posted/news-posted.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent, AddNewsComponent, NewsPostedComponent, ProfileDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
