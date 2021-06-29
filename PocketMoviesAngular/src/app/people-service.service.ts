import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './classes/Person';


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
export class PeopleServiceService {
  private baseURL = 'http://localhost:8000/';
  constructor(private http:HttpClient) { }

  getPeople(param:string):Observable<Person[]>{
    const url = this.baseURL+'people/'+param;
    return this.http.get<Person[]>(url,httpOptions);;
  }
  getSelected(param:string,id:number):Observable<Person>{
    const url = this.baseURL+'people/'+param+'/'+id;
    return this.http.get<Person>(url,httpOptions);
  }
}
