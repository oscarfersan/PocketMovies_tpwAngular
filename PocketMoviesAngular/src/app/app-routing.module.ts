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
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { AuthGuardService } from './auth-guard.service';
import { RoleGuardService } from './role-guard.service';

const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'listPeople/:type',component: ListPeopleComponent, canActivate: [AuthGuardService]},
    {path: 'listMovies/:type',component: ListMoviesComponent, canActivate: [AuthGuardService]},
    {path: 'listProducers',component: ListProducerComponent, canActivate: [AuthGuardService]},
    {path: 'editMovie/:id', component: EditMovieComponent, canActivate: [RoleGuardService]},
    {path: 'editPerson/:type/:id', component: EditPersonComponent, canActivate: [RoleGuardService]},
    {path: 'addMovie', component: AddMovieComponent, canActivate: [RoleGuardService]},
    {path: 'addPerson/:type', component: AddPersonComponent, canActivate: [RoleGuardService]},
    {path: 'producer/:id',component: InfoProducerComponent, canActivate: [AuthGuardService]},
    {path: 'person/:type/:id',component: InfoPersonComponent, canActivate: [AuthGuardService]},
    {path: 'movie/:id',component: InfoMovieComponent, canActivate: [AuthGuardService]},
    {path: 'profile',component:ProfilePageComponent, canActivate: [AuthGuardService]}
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
