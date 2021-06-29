import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../classes/Movie';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-info-movie',
  templateUrl: './info-movie.component.html',
  styleUrls: ['./info-movie.component.css']
})
export class InfoMovieComponent implements OnInit {
  movie:Movie;
  constructor(private movieService:MovieServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovie();
  }
  getMovie(){
    let id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getSelected(id).subscribe((data)=>{
      this.movie = data;
      console.log(data);
    })
  }
}
