import { Component, OnInit } from '@angular/core';
import { Person } from '../classes/Person';
import { PeopleServiceService } from '../people-service.service';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements OnInit {
  person_list:Person[];
  person_role:String;
  constructor(private peopleService:PeopleServiceService) { }

  ngOnInit(): void {
    this.getPeople();
    this.person_role ="ACTOR";
  }
  getPeople():void{
    this.person_list = this.peopleService.getPeople();
  }
}
