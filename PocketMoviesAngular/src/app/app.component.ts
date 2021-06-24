import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../assets/css/list_movies_style.css','../assets/css/list_people_style.css',
  '../assets/css/navbar_style.css','../assets/css/info.css']
})
export class AppComponent {
  exists:boolean = true;
  title = 'PocketMoviesAngular';
}
