import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Movie } from '../classes/Movie';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnInit {

  movieList: Movie[];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserServiceService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.type === "Favorites") {
        this.userService.fetchFavoriteMovies().subscribe(
          value => {
            this.movieList = value["results"];
            this.userService.setFavorites(value["results"]);
          }
        );
      } else if (params.type === "Watched") {
        this.userService.fetchWatchedMovies().subscribe(
          value => {
            this.movieList = value["results"];
            this.userService.setWatched(value["results"]);
          }
        );
      } else if (params.type === "MustWatch") {
        this.userService.fetchMustWatchMovies().subscribe(
          value => {
            this.movieList = value["results"];
            this.userService.setWantToWatch(value["results"]);
          }
        );
      } else {
        this.router.navigate(['/listMovies/all']);
      }
    })
    
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

}
