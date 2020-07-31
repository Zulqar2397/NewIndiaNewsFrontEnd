import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/shared/models/news';
import { NewsappService } from 'src/app/core/service/newsapp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-posted',
  templateUrl: './news-posted.component.html',
  styleUrls: ['./news-posted.component.css']
})
export class NewsPostedComponent implements OnInit {
  selectedCategoryName: string;
  newsList: News[] = [];
  page = 1;
  pageSize = 10;
  colSize;
  constructor(private newsService: NewsappService, private router: Router) { }

  ngOnInit(): void {
    this.newsService.getAllNewsPostedByAdmin(JSON.parse(localStorage.getItem("admin"))).subscribe(data => {
      this.newsList = data.data;
    });
  }
  sendSelectedNews(item) {
    this.newsService.sendSelectedNews(item);
    this.router.navigateByUrl("/news-details")
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
