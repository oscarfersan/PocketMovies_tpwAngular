import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Genre } from '../classes/Genre';
import { Movie } from '../classes/Movie';
import { Person } from '../classes/Person';
import { EditMovieService } from '../edit-movie.service';
import { GenreService } from '../genre.service';
import { MovieServiceService } from '../movie-service.service';
import { PeopleServiceService } from '../people-service.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

    movie: Movie = new Movie();
    allActors: Person[];
    allDirectors: Person[];
    allProducers: Person[];
    allGenres: Genre[];
    
    constructor(private router: Router, private movieService: MovieServiceService, private peopleService: PeopleServiceService, private genreService: GenreService) {}
  
    ngOnInit(): void {
      this.peopleService.getPeople("actors", environment.baseUrl + '/people/actors').subscribe(value=> {
        this.allActors = value["results"];
      })
      this.peopleService.getPeople("directors", environment.baseUrl + '/people/directors').subscribe(value=> {
        this.allDirectors = value["results"];
      })
      this.peopleService.getPeople("producers", environment.baseUrl + '/people/producers').subscribe(value=> {
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
      this.movieService.addMovie(this.movie).subscribe(value=>{
        window.alert("Movie successfully added.")
        this.router.navigate(['/listMovies/all']);
      },
      error=>{
        window.alert("Error adding movie.")
      });
      
    }

}
