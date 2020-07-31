import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsappService } from '../service/newsapp.service'
import { Router } from '@angular/router';
import { News } from '../../shared/models/news'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  selectedCategoryName: string;
  newsList: News[];
  page = 1;
  pageSize = 10;
  colSize;
  constructor(private newsService: NewsappService, private router: Router) { }

  ngOnInit(): void {
    this.newsService.categoryNameSubjectAsObservable.subscribe(data => {
      this.selectedCategoryName = data
    })

    this.newsService.getNewsByCategory(this.selectedCategoryName).subscribe(data => {
      this.newsList = data.data;
      console.log(this.newsList);

    })

  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  sendSelectedNews(item) {
    this.newsService.sendSelectedNews(item);
    this.router.navigateByUrl("/news-details")
  }
}
