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
    url = URL.baseURL + "/user/register-user";
    return this.http.post<any>(url, user);
  }

  loginUser(user): Observable<any> {
    let url = URL.baseURL + "/user/login" + user.mailId + "/" + user.passWord;
    return this.http.get<any>(url);
  }
}
