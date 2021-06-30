import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserServiceService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    let listType = this.route.snapshot.params.type;
    if (listType === "Favorites") {
      this.userService.fetchFavoriteMovies().subscribe(
        value => {
          this.movieList = value["results"];
        }
      );
    } else if (listType === "Watched") {
      this.userService.fetchWatchedMovies().subscribe(
        value => {
          this.movieList = value["results"];
        }
      );
    } else if (listType === "MustWatch") {
      this.userService.fetchMustWatchMovies().subscribe(
        value => {
          this.movieList = value["results"];
        }
      );
    } else {
      this.router.navigate(['/listMovies']);
    }
  }

  isSuperUser() {
    return this.authService.isSuperUser()
  }

}
