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
      this.userService.fetchFavoriteMovies().subscribe(
          value => {
              this.movieList = value;
          }
      );
    } else if (listType === "Watched") {
        this.userService.fetchWatchedMovies().subscribe(
            value => {
                this.movieList = value;
            }
        );
    } else if (listType === "MustWatch") {
        this.userService.fetchMustWatchMovies().subscribe(
            value => {
                this.movieList = value;
            }
        );
    } else {
      this.router.navigate(['/listMovies']);
    }
    console.log(this.movieList);
  }

  

}
