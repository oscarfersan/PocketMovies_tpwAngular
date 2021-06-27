import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../classes/Genre';
import { Movie } from '../classes/Movie';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movie_list:Movie[];
  genre_list:Genre[];
  param:string;
  constructor(private movieService:MovieServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(){
    this.param = this.route.snapshot.paramMap.get('type');
    this.movieService.getMovies(this.param).subscribe(list=>this.movie_list=list);
  }
}
