import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './classes/Movie';

const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type':'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Authorization':'token 411f67f3c4a0ecc1572e422230eabce4621512f8',
  })
}
@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private baseURL = 'http://localhost:8000/';
  constructor(private http:HttpClient) { }
  getMovies(param:string):Observable<Movie[]>{
    const url = this.baseURL+'movies/'+param;
    return this.http.get<Movie[]>(url,httpOptions);
  }
  getSelected(id:number):Observable<Movie>{
    const url = this.baseURL+'movies/info/'+id;
    return this.http.get<Movie>(url,httpOptions);
  }
}
