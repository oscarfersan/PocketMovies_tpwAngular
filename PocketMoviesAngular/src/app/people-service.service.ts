import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Person } from './classes/Person';


const httpOptions = {
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {
  private baseURL = 'http://localhost:8000/';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.authService.getToken()
    })
  };

  getPeople(param:string):Observable<Person[]>{
    const url = this.baseURL+'people/'+param;
    return this.http.get<Person[]>(url, this.httpOptions);
  }
  getSelected(param:string,id:number):Observable<Person>{
    const url = this.baseURL+'people/'+param+'/'+id;
    return this.http.get<Person>(url, this.httpOptions);
  }
}
