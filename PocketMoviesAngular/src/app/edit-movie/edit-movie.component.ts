import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../classes/Genre';
import { Movie } from '../classes/Movie';
import { Person } from '../classes/Person';
import { EditMovieService } from '../edit-movie.service';
import { GenreService } from '../genre.service';
import { MovieServiceService } from '../movie-service.service';
import { PeopleServiceService } from '../people-service.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movie: Movie;
  allActors: Person[];
  allDirectors: Person[];
  allProducers: Person[];
  allGenres: Genre[];
  
  constructor(private router: Router, private editMovieService: EditMovieService, private movieService: MovieServiceService, private route: ActivatedRoute, private peopleService: PeopleServiceService, private genreService: GenreService) {}

  ngOnInit(): void {
    this.movie = this.editMovieService.getSelectedMovie;
    let id = +this.route.snapshot.paramMap.get('id');
    if (id != this.movie.id)
      this.router.navigate(['/movie/' + id]);
    
    this.peopleService.getPeople("actors").subscribe(value=> {
      this.allActors = value["results"];
    })
    this.peopleService.getPeople("directors").subscribe(value=> {
      this.allDirectors = value["results"];
    })
    this.peopleService.getPeople("producers").subscribe(value=> {
      this.allProducers = value["results"];
    })
    this.genreService.getGenres().subscribe(value=> {
      this.allGenres = value;
    })

  }

  compareById(obj1, obj2) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }

  compareByName(obj1, obj2) {
    return obj1 && obj2 && obj1.name == obj2.name;
  }

  saveChanges() {
    this.movieService.editMovie(this.movie).subscribe(value=>{
      this.router.navigate(['/movie/' + this.movie.id]);
      window.alert("Movie successfully edited.")
    },
    error=>{
      window.alert("Error editting movie.")
    });
    
  }

}
