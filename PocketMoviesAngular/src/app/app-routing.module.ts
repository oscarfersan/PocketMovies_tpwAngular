import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ListProducerComponent } from './list-producer/list-producer.component';
import { InfoProducerComponent } from './info-producer/info-producer.component';
import { InfoPersonComponent } from './info-person/info-person.component';
import { InfoMovieComponent } from './info-movie/info-movie.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignupComponent } from './signup/signup.component';
import { PersonalListComponent } from './personal-list/personal-list.component';

const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'listPeople/:type',component: ListPeopleComponent},
    {path: 'listMovies/:type',component: ListMoviesComponent},
    {path: 'listProducers',component: ListProducerComponent},
    {path: 'producer/:id',component: InfoProducerComponent},
    {path: 'person/:type/:id',component: InfoPersonComponent},
    {path: 'movie/:id',component: InfoMovieComponent},
    {path: 'personalList/:type', component: PersonalListComponent},
    {path:'profile',component:ProfilePageComponent}
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
