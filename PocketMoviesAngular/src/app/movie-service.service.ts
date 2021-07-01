import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Movie } from './classes/Movie';
@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private deleteMovieUrl: string;
  private editMovieUrl: string;
  private addMovieUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Authorization': 'JWT ' + this.authService.getToken()
    })
  };
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.deleteMovieUrl = environment.baseUrl + '/delete/movie/';
    this.editMovieUrl = environment.baseUrl + '/edit/movie/';
    this.addMovieUrl = environment.baseUrl + '/add/movie/';
  }

  getMovies(movieUrl: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(movieUrl, this.httpOptions);
  }
  getSelected(id: number): Observable<Movie> {
    const url = environment.baseUrl + '/movie/' + id;
    return this.http.get<Movie>(url, this.httpOptions);
  }

  deleteMovie(movie: Movie) {
    this.http.delete(this.deleteMovieUrl + movie.id, this.httpOptions).subscribe(error => { });
  }

  editMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.editMovieUrl + movie.id, movie, this.httpOptions);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.addMovieUrl, movie, this.httpOptions);
  }
}
