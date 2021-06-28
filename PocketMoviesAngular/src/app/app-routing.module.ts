import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path:'listActors',component:ListPeopleComponent},
    {path:'listMovies',component:ListMoviesComponent},
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
