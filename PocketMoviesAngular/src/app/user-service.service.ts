import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Genre } from './classes/Genre';
import { Movie } from './classes/Movie';
import { User } from './classes/User';

@Injectable({
    providedIn: 'root'
})
export class UserServiceService {

    private current_user: User;
    private favoriteMovies: Movie[] = [];
    private watchedMovies: Movie[] = [];
    private wantToWatchMovies: Movie[] = [];
    private moviesUrl: string;
    private addUrl: string;
    private removeUrl: string;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem("token")
        })
    };

    constructor(private http: HttpClient) {
        this.moviesUrl = environment.baseUrl + '/movies';
        this.addUrl = environment.baseUrl + '/add';
        this.removeUrl = environment.baseUrl + '/remove';
    }

    setCurrentUser(user: User) {
        this.current_user = user;
    }

    get getFavoriteMovies() {
        return this.favoriteMovies;
    }

    setFavorites(movies: Movie[]) {
        this.favoriteMovies = movies;
    }

    get getWatchedMovies() {
        return this.watchedMovies;
    }

    setWatched(movies: Movie[]) {
        this.watchedMovies = movies;
    }

    get getWantToWatchMovies() {
        return this.wantToWatchMovies;
    }

    setWantToWatch(movies: Movie[]) {
        this.wantToWatchMovies = movies;
    }

    addMovieToFavorites(movie: Movie) {
        this.favoriteMovies.push(movie);
        return this.http.post(this.addUrl + '/favorites/' + movie.id, {}, this.httpOptions).subscribe();
    }

    addMovieToWatched(movie: Movie) {
        this.watchedMovies.push(movie);
        return this.http.post(this.addUrl + '/watched/' + movie.id, {}, this.httpOptions).subscribe();
    }

    addToWantToWatch(movie: Movie) {
        this.wantToWatchMovies.push(movie);
        return this.http.post(this.addUrl + '/want_to_watch/' + movie.id, {}, this.httpOptions).subscribe();
    }

    removeMovieFromFavorites(movie: Movie) {
        this.favoriteMovies.forEach((value,index)=>{
            if(value.id==movie.id) this.favoriteMovies.splice(index,1);
        });
        return this.http.delete(this.removeUrl + '/favorites/' + movie.id, this.httpOptions).subscribe();
    }

    removeMovieFromWatched(movie: Movie) {
        this.watchedMovies.forEach((value,index)=>{
            if(value.id==movie.id) this.watchedMovies.splice(index,1);
        });
        return this.http.delete(this.removeUrl + '/watched/' + movie.id, this.httpOptions).subscribe();
    }

    removeMovieFromWantToWatch(movie: Movie) {
        this.wantToWatchMovies.forEach((value,index)=>{
            if(value.id==movie.id) this.wantToWatchMovies.splice(index,1);
        });
        return this.http.delete(this.removeUrl + '/want_to_watch/' + movie.id, this.httpOptions).subscribe();
    }

}
