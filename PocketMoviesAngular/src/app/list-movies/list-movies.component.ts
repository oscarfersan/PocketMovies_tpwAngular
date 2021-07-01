import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { Genre } from '../classes/Genre';
import { Movie } from '../classes/Movie';
import { EditMovieService } from '../edit-movie.service';
import { MovieServiceService } from '../movie-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movie_list: Movie[];
  genre_list: Genre[];
  param: string;
  private next: string;
  private previous: string;
  private allMoviesUrl: string;
  private favoriteMoviesUrl: string;
  private watchedMoviesUrl: string;
  private wantToWatchMoviesUrl: string;
  private pageRange: number[] = [1, 2, 3, 4, 5];
  private activePage: number = 1;
  private nPages: number;

  constructor(private router: Router, private movieService: MovieServiceService, private route: ActivatedRoute, private userService: UserServiceService, private authService: AuthenticationService, private editMovieService: EditMovieService) { }

  ngOnInit(): void {
    this.allMoviesUrl = environment.baseUrl + '/movies/all';
    this.favoriteMoviesUrl = environment.baseUrl + '/movies/my_favorite_movies';
    this.watchedMoviesUrl = environment.baseUrl + '/movies/my_watched_movies';
    this.wantToWatchMoviesUrl = environment.baseUrl + '/movies/my_want_to_watch';

    this.movieService.getMovies(this.favoriteMoviesUrl).subscribe(value => {
      this.userService.setFavorites(value["results"]);
    })
    this.movieService.getMovies(this.watchedMoviesUrl).subscribe(value => {
      this.userService.setWatched(value["results"]);
    })
    this.movieService.getMovies(this.wantToWatchMoviesUrl).subscribe(value => {
      this.userService.setWantToWatch(value["results"]);
    })

    this.route.params.subscribe((params: Params) => {
      if (params.type == "favorites")
        this.getMovies(this.favoriteMoviesUrl);
      else if (params.type == "watched")
        this.getMovies(this.watchedMoviesUrl);
      else if (params.type == "mustWatch")
        this.getMovies(this.wantToWatchMoviesUrl);
      else
        this.getMovies(this.allMoviesUrl);
    })
  }
  getMovies(moviesUrl: string) {
    this.movieService.getMovies(moviesUrl).subscribe(list => {
      this.movie_list = list["results"];
      this.next = list["next"];
      this.previous = list["previous"];
      this.nPages = Math.ceil(list["count"] / 9)
      this.pageRange = this.calcPageRange(1);
    });
  }

  get getPageRange() {
    return this.pageRange;
  }
  get getActivePage() {
    return this.activePage;
  }
  get getPrevious() {
    return this.previous;
  }
  get getNext() {
    return this.next;
  }

  getPreviousMovies() {
    this.getMovies(this.previous);
    this.activePage -= 1;
    this.pageRange = this.calcPageRange(this.activePage);
  }

  getPageMovies(pageNumber: number) {
    this.getMovies(this.allMoviesUrl + '?page=' + pageNumber);
    this.activePage = pageNumber;
    this.pageRange = this.calcPageRange(this.activePage);
  }

  getNextMovies() {
    this.getMovies(this.next);
    this.activePage += 1;
    this.pageRange = this.calcPageRange(this.activePage);
  }

  calcPageRange(page: number) {
    if (this.nPages <= 5)
      return Array.from({ length: this.nPages }, (_, i) => i + 1)

    if (page == 1 || page == 2)
      return [1, 2, 3, 4, 5];

    if (page == this.nPages - 1 || page == this.nPages - 2)
      return [this.nPages - 3, this.nPages - 3, this.nPages - 2, this.nPages - 1, this.nPages];

    return [page - 2, page - 1, page, page + 1, page + 2];
  }

  isSuperUser() {
    return this.authService.isSuperUser()
  }

  movieInFavorites(movie: Movie) {
    return this.userService.getFavoriteMovies.some(mov => mov.id == movie.id);
  }

  movieInWatched(movie: Movie) {
    return this.userService.getWatchedMovies.some(mov => mov.id == movie.id);
  }

  movieInWantToWatch(movie: Movie) {
    return this.userService.getWantToWatchMovies.some(mov => mov.id == movie.id);
  }

  addToFavorites(movie: Movie) {
    this.userService.addMovieToFavorites(movie)
  }

  removeFromFavorites(movie: Movie) {
    this.userService.removeMovieFromFavorites(movie)
  }

  addToWatched(movie: Movie) {
    this.userService.addMovieToWatched(movie)
  }

  removeFromWatched(movie: Movie) {
    this.userService.removeMovieFromWatched(movie)
  }

  addToWantToWatch(movie: Movie) {
    this.userService.addToWantToWatch(movie)
  }

  removeFromWantToWatch(movie: Movie) {
    this.userService.removeMovieFromWantToWatch(movie)
  }

  deleteMovie(movie: Movie) {
    if (confirm(`Are you sure you want to delete ${movie.title}?`)) {
      this.movie_list.forEach((value, index) => {
        if (value.id == movie.id) this.movie_list.splice(index, 1);
      });
      this.movieService.deleteMovie(movie);
    }
  }

  editMovie(movie: Movie) {
    this.editMovieService.setSelectedMovie(movie);
    this.router.navigate(['/editMovie/' + movie.id]);
  }
}
