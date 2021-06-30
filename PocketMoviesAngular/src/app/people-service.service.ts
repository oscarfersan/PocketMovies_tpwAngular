import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Person } from './classes/Person';


@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Authorization': 'JWT ' + this.authService.getToken()
    })
  };
  private baseURL = 'http://localhost:8000/';
  constructor(private http:HttpClient,private authService: AuthenticationService) { }

  getPeople(param:string):Observable<Person[]>{
    const url = this.baseURL+'people/'+param;
    return this.http.get<Person[]>(url,this.httpOptions);;
  }
  getSelected(param:string,id:number):Observable<Person>{
    const url = this.baseURL+'people/'+param+'/'+id;
    return this.http.get<Person>(url,this.httpOptions);
  }
}
