import { Component, OnInit } from '@angular/core';
import {News} from 'src/app/shared/models/news';
import {NewsappService} from 'src/app/core/service/newsapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  news: News = new News();
  submitted = false;
  constructor(private newsService: NewsappService,
    private router: Router) { }
  
  ngOnInit(): void {

  }
  onSubmit() {
    this.submitted = true;
 
   
    let adminsEmail= localStorage.getItem("admin");
    console.log(adminsEmail);
    this.news.admins.email=adminsEmail;

    this.save();    
  }
  newNews(): void {
    this.submitted = false;
  
  }

  save() {
  
    this.newsService.addNews(this.news)
      .subscribe(data => console.log(data), error => console.log(error));
    this.news = new News();
   
  }

}
