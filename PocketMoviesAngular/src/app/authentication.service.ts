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
  private permissionsUrl: string;
  private isSuperuser: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
    this.loginUrl = environment.baseUrl + '/login/';
    this.permissionsUrl = environment.baseUrl + '/permissions/';
  }

  login(username: string, password: string) {
    this.http.post(this.loginUrl, { username: username, password: password }, this.httpOptions)
      .subscribe(
        value => {
          if (value != null) {
            let receivedToken = value["token"];
            localStorage.setItem('token', receivedToken);
            this.router.navigate(['/listMovies/all']);

            let permHttpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + receivedToken }) };
            this.http.get(this.permissionsUrl, permHttpOptions).subscribe(
              value => {
                console.log(value["admin"]);
                this.isSuperuser = value["admin"];
              }
            );

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

  isSuperUser() {
    return this.isSuperuser
  }

  logout() {
    localStorage.removeItem("token");
    this.isSuperuser = false;
  }
}
