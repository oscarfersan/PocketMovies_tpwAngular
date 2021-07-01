import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListProducerComponent } from './list-producer/list-producer.component';
import { SignupComponent } from './signup/signup.component';
import { InfoMovieComponent } from './info-movie/info-movie.component';
import { InfoPersonComponent } from './info-person/info-person.component';
import { InfoProducerComponent } from './info-producer/info-producer.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { AddPersonComponent } from './add-person/add-person.component';
export function tokenGetter() {
    return localStorage.getItem("token");
  }
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListMoviesComponent,
    ListPeopleComponent,
    ListProducerComponent,
    InfoMovieComponent,
    InfoPersonComponent,
    InfoProducerComponent,
    SignupComponent,
    PersonalListComponent,
    ProfilePageComponent,
    SignupComponent, EditMovieComponent, AddMovieComponent, EditPersonComponent, AddPersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        },
      }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
