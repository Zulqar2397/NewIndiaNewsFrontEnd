import { Injectable } from '@angular/core';
import { URL } from '../../utilities/url'
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { News } from 'src/app/shared/models/news';
@Injectable({
  providedIn: 'root'
})
export class NewsappService {

  constructor(private http: HttpClient) { }


  getNewsByCategory(category): Observable<any> {
    let url = URL.baseURL + "news/getNewsByCategory/" + category;
    return this.http.get<any>(url);
  }

  //Method for sending category name
  categoryNameSubject = new BehaviorSubject<string>(undefined);
  categoryNameSubjectAsObservable = this.categoryNameSubject.asObservable();
  sendSelectedCategoryName(categoryName: string) {
    this.categoryNameSubject.next(categoryName);
  }

  //Method for sending selected news
  newsSubject = new BehaviorSubject<News>(undefined);
  newsSubjectAsObservable = this.newsSubject.asObservable();
  sendSelectedNews(news:News)
  {
    this.newsSubject.next(news);
  }
}
