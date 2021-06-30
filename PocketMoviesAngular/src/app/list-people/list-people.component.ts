import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(private peopleService:PeopleServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getPeople();
    });
  }
  getPeople():void{
    this.person_role = this.route.snapshot.paramMap.get('type');
    
    this.title = this.person_role.substr(0,1).toUpperCase() + this.person_role.substr(1);
    this.peopleService.getPeople(this.person_role.valueOf()).subscribe(actors=>{
      this.person_list=actors["results"];
    });
  }
}
