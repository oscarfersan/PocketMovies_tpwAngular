import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producer } from './classes/Producer';
const httpOptions = {
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class ProducerServiceService {
  private baseURL = 'http://localhost:8000/';
  constructor(private http:HttpClient) { }
  getProducer():Observable<Producer[]>{
    return this.http.get<Producer[]>(this.baseURL+'people/producers')
  }
}
