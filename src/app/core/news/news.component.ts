import { Component, OnInit } from '@angular/core';
import { NewsappService } from '../service/newsapp.service';
import { News } from 'src/app/shared/models/news';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  trendingNewsList: News[] = [];
  recentNewsList:News[] = [];
  popularPoliticsNewsList: News[] = [];
  popularBusinessAndEconomyNewsList: News[] = [];
  popularWorldNewsList: News[] = [];
  popularTechnologyNewsList: News[] = [];
  event_list: string[] = ["assets/images/img_h_1.jpg", "assets/images/img_v_1.jpg"];
  constructor(private newsService: NewsappService, private router: Router) { }

  ngOnInit(): void {
    this.newsService.getTrendingNews().subscribe(data => {
      this.trendingNewsList = data.data;

    })

    this.newsService.getRecentNewsList().subscribe(data=>{
      this.recentNewsList=data.data;
      console.log(this.recentNewsList);
      
    })
    this.newsService.getNewslistWithMaxHitCount().subscribe(data => {
      data.data.filter(element => {
        switch (element.category.categoryName) {
          case 'Politics':
            this.popularPoliticsNewsList.push(element);
            break;
          case 'Business & Economy':
            this.popularBusinessAndEconomyNewsList.push(element);
            break;
          case 'World News':
            this.popularWorldNewsList.push(element);
            break;
          case 'Technology':
            this.popularTechnologyNewsList.push(element);
            break;
          default:
            break;
        }
      })
    })
  }
  sendSelectedNews(trendingNews) {
    this.newsService.sendSelectedNews(trendingNews);
    this.router.navigateByUrl("/news-details")
  }
  selectedCategory(categoryName: string) {
    this.newsService.sendSelectedCategoryName(categoryName);
    this.redirectTo("/category");
  }
//this is used because when user is inside category and chose to select any category, oninit is not called on same route redirct
  redirectTo(uri) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
