import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Genre } from './classes/Genre';
import { Movie } from './classes/Movie';

@Injectable({
    providedIn: 'root'
})
export class UserServiceService {

    private moviesUrl: string;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authenticationService.getToken()
        })
    };

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        this.moviesUrl = environment.baseUrl + '/movies';
    }

    fetchFavoriteMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.moviesUrl + '/my_favorite_movies', this.httpOptions);
    }

    fetchWatchedMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.moviesUrl + '/my_watched_movies', this.httpOptions);
    }

    fetchMustWatchMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.moviesUrl + '/my_want_to_watch', this.httpOptions);
    }

}
