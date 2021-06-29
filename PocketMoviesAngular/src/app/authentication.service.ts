import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl: string;

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private params;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
    this.loginUrl = environment.baseUrl + '/login';
  }

  login(username: string, password: string) {
      this.params = new HttpParams().set("username",username).set("password", password);
    this.http.get<string>(this.loginUrl, {headers: this.headers, params: this.params})
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
    let token = localStorage.getItem("token");

    if (token != undefined)
      if (!this.jwtHelper.isTokenExpired(token))
        return true;

    return false;
  }

  logout() {
    localStorage.removeItem("token");
  }
}
