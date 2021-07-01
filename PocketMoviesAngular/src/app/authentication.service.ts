import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserServiceService } from './user-service.service';
import { User } from './classes/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl: string;
  private permissionsUrl: string;
  private infoProfileUrl: string;
  private isSuperuser: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private userService: UserServiceService) {
    this.loginUrl = environment.baseUrl + '/login/';
    this.permissionsUrl = environment.baseUrl + '/permissions/';
    this.infoProfileUrl = environment.baseUrl + '/infoProfile/';
  }

  login(username: string, password: string) {
    this.http.post(this.loginUrl, { username: username, password: password }, this.httpOptions)
      .subscribe(
        value => {
          if (value != null) {
            let receivedToken = value["token"];
            localStorage.setItem('token', receivedToken);
            
            let permHttpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + receivedToken }) };
            this.http.get(this.permissionsUrl, permHttpOptions).subscribe(
              value => {
                this.isSuperuser = value["admin"];
                localStorage.setItem("ad", value["admin"]);
              }
            );

            this.http.get<User>(this.permissionsUrl, permHttpOptions).subscribe(
                value => {
                    this.userService.setCurrentUser(value);
                }
            );
            this.router.navigate(['/listMovies/all']);
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
    return this.isSuperuser || localStorage.getItem("ad")=="true";
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("ad");
    this.isSuperuser = false;
  }
}
