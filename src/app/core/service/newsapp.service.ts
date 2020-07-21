import { Injectable } from '@angular/core';
import { URL } from '../../utilities/url'
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
}
