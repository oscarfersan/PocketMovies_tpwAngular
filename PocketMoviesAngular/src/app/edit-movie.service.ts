import { Injectable } from '@angular/core';
import { Movie } from './classes/Movie';

@Injectable({
  providedIn: 'root'
})
export class EditMovieService {

  private selectedMovie: Movie;

  constructor() { }

  setSelectedMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  get getSelectedMovie() {
    return this.selectedMovie;
  }
}
