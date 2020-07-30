import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { URL } from '../../utilities/url'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  registerUser(user): Observable<any> {
    let url: string;
    url = URL.baseURL + "admin/registerAdmin";
    return this.http.post<any>(url, user);
  }

  loginUser(user): Observable<any> {
    let url = URL.baseURL + "admin/login/" + user.email + "/" + user.password;
    return this.http.get<any>(url);
  }
}
