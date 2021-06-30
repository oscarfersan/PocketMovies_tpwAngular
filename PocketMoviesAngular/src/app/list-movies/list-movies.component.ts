import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Genre } from '../classes/Genre';
import { Movie } from '../classes/Movie';
import { MovieServiceService } from '../movie-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movie_list:Movie[];
  genre_list:Genre[];
  param:string;
  constructor(private movieService: MovieServiceService,private route: ActivatedRoute, private userService: UserServiceService, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.getMovies();
  }
  checkSuperUser():boolean{
    return this.auth.isSuperUser();
  }
  getMovies(){
    this.param = this.route.snapshot.paramMap.get('type');
    this.userService.fetchFavoriteMovies().subscribe(value=>{
      this.userService.setFavorites(value["results"]);
    })
    this.userService.fetchWatchedMovies().subscribe(value=>{
      this.userService.setWatched(value["results"]);
    })
    this.userService.fetchMustWatchMovies().subscribe(value=>{
      this.userService.setWantToWatch(value["results"]);
    })
    this.movieService.getMovies(this.param).subscribe(list=>{
      this.movie_list=list["results"];
    });
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
