import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Producer } from './classes/Producer';
@Injectable({
  providedIn: 'root'
})
export class ProducerServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Authorization': 'JWT ' + this.authService.getToken()
    })
  };
  private baseURL = 'http://localhost:8000/';
  constructor(private http:HttpClient,private authService: AuthenticationService) { }
  getProducer():Observable<Producer[]>{
    return this.http.get<Producer[]>(this.baseURL+'people/producers',this.httpOptions)
  }
  getSelected(id:number):Observable<Producer>{
    const url = this.baseURL+'people/'+'producers'+'/'+id;
    return this.http.get<Producer>(url,this.httpOptions);
  }
}
