import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../classes/Movie';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnInit {

  movieList: Movie[];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserServiceService) { }

  ngOnInit(): void {
    let listType = this.route.snapshot.params.type;
    if (listType === "Favorites") {
      this.movieList = this.userService.fetchFavoriteMovies();
    } else if (listType === "Watched") {
      this.movieList = this.userService.fetchWatchedMovies();
    } else if (listType === "MustWatch") {
      this.movieList = this.userService.fetchMustWatchMovies();
    } else {
      this.router.navigate(['/listMovies']);
    }
    console.log(this.movieList);
  }

  

}
