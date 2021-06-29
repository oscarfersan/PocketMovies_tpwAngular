import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../classes/Person';
import { PeopleServiceService } from '../people-service.service';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.css']
})
export class InfoPersonComponent implements OnInit {

  type:string;
  person:Person;
  constructor(private personService:PeopleServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getPerson();
  }
  getPerson(){
    let id = +this.route.snapshot.paramMap.get('id'); 
    this.type = this.route.snapshot.paramMap.get('type');
    this.personService.getSelected(this.type,id).subscribe((data)=>this.person = data);
  }
}
