import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../classes/Person';
import { PeopleServiceService } from '../people-service.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  person: Person = {
    id:0,
    name:"",
    birthdate:"",
    imageField:"",
    nationality:"",
    instagramAccount:"",
    twitterAccount:""
  };
  website:string;
  type: string;

  constructor(private peopleService: PeopleServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
  }

  saveChanges() {
    if (this.type == "actors")
      this.peopleService.addActor(this.person).subscribe(value => {
        window.alert("Actor successfully added.");
        this.router.navigate(['/listPeople/' + this.type]);
      },
        error => {
          window.alert("Error adding actor.");
        });
    if (this.type == "directors")
      this.peopleService.addDirector(this.person,this.website).subscribe(value => {
        window.alert("Director successfully added.");
        this.router.navigate(['/listPeople/' + this.type]);
        
      },
        error => {
          window.alert("Error adding director.");
        });
    if (this.type == "producers")
      this.peopleService.addProducer(this.person,this.website).subscribe(value => {
        window.alert("Producer successfully added.");
        this.router.navigate(['/listPeople/' + this.type]);
        
      },
        error => {
          window.alert("Error adding producer.");
        });

  }

  get isActor() {
    return this.type=="actors"
  }
  get isProducer() {
    return this.type=="producers"
  }
  get isDirector() {
    return this.type=="directors"
  }

}
