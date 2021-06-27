import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListProducerComponent } from './list-producer/list-producer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListMoviesComponent,
    ListPeopleComponent,
    ListProducerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
