import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { NewsappService } from 'src/app/core/service/newsapp.service';
import { Admins } from 'src/app/shared/models/admins';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  admin: Admins;
  constructor(private newsService: NewsappService) { }

  ngOnInit(): void {
    this.newsService.getAdminByEmail(JSON.parse(localStorage.getItem("admin"))).subscribe(data => { this.admin = data.data });
  }

}
