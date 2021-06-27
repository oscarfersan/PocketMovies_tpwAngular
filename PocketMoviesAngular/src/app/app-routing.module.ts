import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ListProducerComponent } from './list-producer/list-producer.component';


const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'listPeople/:type',component:ListPeopleComponent},
  {path:'listMovies/:type',component:ListMoviesComponent},
  {path:'listProducers',component:ListProducerComponent},
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
