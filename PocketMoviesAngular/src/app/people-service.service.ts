import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Person } from './classes/Person';
@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {
  private selectedPerson: Person;

  private addActorUrl: string;
  private addDirectorUrl: string;
  private addProducerUrl: string;

  private editActorUrl: string;
  private editDirectorUrl: string;
  private editProducerUrl: string;

  private deleteActorUrl: string;
  private deleteDirectorUrl: string;
  private deleteProducerUrl: string;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.addActorUrl = environment.baseUrl + '/add/actor/';
    this.addDirectorUrl = environment.baseUrl + '/add/director/';
    this.addProducerUrl = environment.baseUrl + '/add/producer/';

    this.editActorUrl = environment.baseUrl + '/edit/actor/';
    this.editDirectorUrl = environment.baseUrl + '/edit/director/';
    this.editProducerUrl = environment.baseUrl + '/edit/producer/';

    this.deleteActorUrl = environment.baseUrl + '/delete/actor/';
    this.deleteDirectorUrl = environment.baseUrl + '/delete/director/';
    this.deleteProducerUrl = environment.baseUrl + '/delete/producer/';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    })
  };

  setSelectedPerson(person: Person) {
    this.selectedPerson = person;
  }

  get getSelectedPerson() {
    return this.selectedPerson;
  }

  getPeople(param: string, peopleUrl: string): Observable<Person[]> {
    return this.http.get<Person[]>(peopleUrl, this.httpOptions);
  }
  getSelected(param: string, id: number): Observable<Person> {
    const url = environment.baseUrl + '/people/' + param + '/' + id;
    return this.http.get<Person>(url, this.httpOptions);
  }

  addActor(person: Person): Observable<Person> {
    const aux = {
      "name": person.name,
      "birthdate": person.birthdate,
      "imageField": person.imageField,
      "nationality": person.nationality,
      "instagramAccount": person.instagramAccount,
      "twitterAccount": person.twitterAccount,
      "years_active":0,
    }
    return this.http.post<Person>(this.addActorUrl, aux, this.httpOptions);
  }
  addDirector(person: Person,website:string): Observable<Person> {
    const aux = {
      "name": person.name,
      "birthdate": person.birthdate,
      "imageField": person.imageField,
      "nationality": person.nationality,
      "instagramAccount": person.instagramAccount,
      "twitterAccount": person.twitterAccount,
      "website":website,
    }
    return this.http.post<Person>(this.addDirectorUrl, aux, this.httpOptions);
  }
  addProducer(person: Person,website:string): Observable<Person> {
    const aux = {
      "name": person.name,
      "imageField": person.imageField,
      "country": "Country",
      "city":"City",
      "instagramAccount": person.instagramAccount,
      "twitterAccount": person.twitterAccount,
      "website":website,
    }
    console.log(aux);
    return this.http.post<Person>(this.addProducerUrl, aux, this.httpOptions);
  }

  editActor(person: Person): Observable<Person> {
    return this.http.put<Person>(this.editActorUrl + person.id, person, this.httpOptions);
  }
  editDirector(person: Person): Observable<Person> {
    return this.http.put<Person>(this.editDirectorUrl + person.id, person, this.httpOptions);
  }
  editProducer(person: Person): Observable<Person> {
    return this.http.put<Person>(this.editProducerUrl + person.id, person, this.httpOptions);
  }

  deleteActor(person: Person): Observable<Person> {
    return this.http.delete<Person>(this.deleteActorUrl + person.id, this.httpOptions);
  }
  deleteDirector(person: Person): Observable<Person> {
    return this.http.delete<Person>(this.deleteDirectorUrl + person.id, this.httpOptions);
  }
  deleteProducer(person: Person): Observable<Person> {
    return this.http.delete<Person>(this.deleteProducerUrl + person.id, this.httpOptions);
  }
}
