import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router) {
    this.loginUrl = environment.baseUrl + '/login';
  }

  login(username, password) {
    this.http.post<string>(this.loginUrl, { 'username': username, 'password': password }, this.httpOptions)
      .subscribe(
        value => {
          if (value != null) {
            localStorage.setItem('token', value);
            this.router.navigate(['/home']);
          } else {
            window.alert("Invalid credentials!");
          }
        },
        error => { return throwError("Authentication request unsuccessful.") }
      );
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
  }

  logout() {

  }
}
