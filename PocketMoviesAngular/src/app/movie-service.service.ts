import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from './authentication.service';
import { Movie } from './classes/Movie';
@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Authorization': 'JWT ' + this.authService.getToken()
    })
  };
  private baseURL = 'http://localhost:8000/';


  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getMovies(param: string): Observable<Movie[]> {
    const url = this.baseURL + 'movies/' + param;
    return this.http.get<Movie[]>(url, this.httpOptions);
  }
  getSelected(id: number): Observable<Movie> {
    const url = this.baseURL + 'movies/info/' + id;
    return this.http.get<Movie>(url, this.httpOptions);
  }
}
