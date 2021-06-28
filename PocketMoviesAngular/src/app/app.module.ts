import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListProducerComponent } from './list-producer/list-producer.component';
import {HttpClientModule} from '@angular/common/http';
import { InfoMovieComponent } from './info-movie/info-movie.component';
import { InfoPersonComponent } from './info-person/info-person.component';
import { InfoProducerComponent } from './info-producer/info-producer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListMoviesComponent,
    ListPeopleComponent,
    ListProducerComponent,
    InfoMovieComponent,
    InfoPersonComponent,
    InfoProducerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
