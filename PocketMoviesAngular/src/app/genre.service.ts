import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Genre } from './classes/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    })
  };

  getGenres(): Observable<Genre[]> {
    const url = environment.baseUrl + '/genres/';
    return this.http.get<Genre[]>(url, this.httpOptions);
  }
}
