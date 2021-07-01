import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { Person } from '../classes/Person';
import { PeopleServiceService } from '../people-service.service';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements OnInit {
  person_list:Person[];
  person_role:string;
  title: string;
  private next: string;
  private previous: string;
  private peopleUrl: string;
  private favoriteMoviesUrl: string;
  private watchedMoviesUrl: string;
  private wantToWatchMoviesUrl: string;
  private pageRange: number[] = [1, 2, 3, 4, 5];
  private activePage: number = 1;
  private nPages: number;

  constructor(private peopleService:PeopleServiceService,private route:ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.peopleUrl = environment.baseUrl + '/people/';
    this.route.params.subscribe((params: Params) => {
      this.person_role = this.route.snapshot.paramMap.get('type');
      this.title = this.person_role.substr(0,1).toUpperCase() + this.person_role.substr(1);
      this.getPeople(environment.baseUrl + '/people/' + this.person_role);
    });
  }

  getPeople(peopleUrl: string) {
    this.peopleService.getPeople(this.person_role, peopleUrl).subscribe(list => {
      this.person_list = list["results"];
      this.next = list["next"];
      this.previous = list["previous"];
      this.nPages = Math.ceil(list["count"] / 9)
      this.pageRange = this.calcPageRange(1);
    });
    this.peopleService.getPeople(this.person_role.valueOf(), peopleUrl).subscribe(actors=>{
      this.person_list=actors["results"];
      console.log(actors)
    });
  }

  calcPageRange(page: number) {
    if (this.nPages <= 5)
      return Array.from({ length: this.nPages }, (_, i) => i + 1)

    if (page == 1 || page == 2)
      return [1, 2, 3, 4, 5];

    if (page == this.nPages - 1 || page == this.nPages - 2)
      return [this.nPages - 3, this.nPages - 3, this.nPages - 2, this.nPages - 1, this.nPages];

    return [page - 2, page - 1, page, page + 1, page + 2];
  }

  get getPageRange() {
    return this.pageRange;
  }
  get getActivePage() {
    return this.activePage;
  }
  get getPrevious() {
    return this.previous;
  }
  get getNext() {
    return this.next;
  }

  getPreviousPeople() {
    this.getPeople(this.previous);
    this.activePage -= 1;
    this.pageRange = this.calcPageRange(this.activePage);
  }

  getPagePeople(pageNumber: number) {
    this.getPeople(this.peopleUrl + this.person_role + '?page=' + pageNumber);
    this.activePage = pageNumber;
    this.pageRange = this.calcPageRange(this.activePage);
  }

  getNextPeople() {
    this.getPeople(this.next);
    this.activePage += 1;
    this.pageRange = this.calcPageRange(this.activePage);
  }

  isSuperUser() {
    return this.authService.isSuperUser()
  }

  get isActor() {
    console.log(this.person_role)
    return this.person_role=="actors"
  }
  get isProducer() {console.log(this.person_role)
    return this.person_role=="producers"
  }
  get isDirector() {console.log(this.person_role)
    return this.person_role=="directors"
  }
}
