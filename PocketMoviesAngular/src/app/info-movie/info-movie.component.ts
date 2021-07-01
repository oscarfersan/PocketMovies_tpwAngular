import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Movie } from '../classes/Movie';
import { EditMovieService } from '../edit-movie.service';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-info-movie',
  templateUrl: './info-movie.component.html',
  styleUrls: ['./info-movie.component.css']
})
export class InfoMovieComponent implements OnInit {
  movie:Movie;
  constructor(private router: Router, private movieService:MovieServiceService, private route:ActivatedRoute, private editMovieService: EditMovieService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getMovie();
  }
  getMovie(){
    let id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getSelected(id).subscribe((data)=>{
      this.movie = data;
      this.editMovieService.setSelectedMovie(data);
    })
  }

  isSuperUser() {
    return this.authService.isSuperUser();
  }

  deleteMovie(movie: Movie) {
    if (confirm(`Are you sure you want to delete ${movie.title}?`)) {
      this.movieService.deleteMovie(movie);
      this.router.navigate(['/listMovies/all']);
    }
  }

  editMovie(movie: Movie) {
    this.editMovieService.setSelectedMovie(movie);
    this.router.navigate(['/editMovie/' + movie.id]);
  }
}
