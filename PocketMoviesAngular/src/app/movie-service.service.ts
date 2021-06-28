import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './classes/Movie';

const httpOptions = {
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private baseURL = 'http://localhost:8000/';
  constructor(private http:HttpClient) { }
  getMovies(param:string):Observable<Movie[]>{
    const url = this.baseURL+'movies/'+param;
    return this.http.get<Movie[]>(url);
  }
  getSelected(id:number):Observable<Movie>{
    const url = this.baseURL+'movies/info/'+id;
    return this.http.get<Movie>(url);
  }
}
