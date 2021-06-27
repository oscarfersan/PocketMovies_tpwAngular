import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private peopleService:PeopleServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getPeople();
  }
  getPeople():void{
    this.person_role = this.route.snapshot.paramMap.get('type');
    console.log(this.person_role);
    this.peopleService.getPeople(this.person_role.valueOf()).subscribe(actors=>this.person_list=actors);
  }
}
