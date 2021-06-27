import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';


const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'listActors',component:ListPeopleComponent},
  {path:'listMovies',component:ListMoviesComponent},
]

@NgModule({
  exports:[RouterModule],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
