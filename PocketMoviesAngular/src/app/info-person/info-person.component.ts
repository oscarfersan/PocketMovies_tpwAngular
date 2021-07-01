import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
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
  constructor(private personService:PeopleServiceService,private route:ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getPerson();
  }
  getPerson(){
    let id = +this.route.snapshot.paramMap.get('id'); 
    this.type = this.route.snapshot.paramMap.get('type');
    this.personService.getSelected(this.type,id).subscribe((data)=>this.person = data);
  }

  isSuperUser() {
    return this.authService.isSuperUser();
  }


  editPerson(person: Person) {
    this.personService.setSelectedPerson(person);
    this.router.navigate(['/editPerson/' + this.type + '/' + person.id]);
  }

  deletePerson(person: Person) {
    if (confirm(`Are you sure you want to delete ${person.name}?`)) {
      if (this.type=="actors")
        this.personService.deleteActor(person).subscribe(value=>{window.alert(person.name + " successfully deleted.")});
      if (this.type=="directors")
        this.personService.deleteDirector(person).subscribe(value=>{window.alert(person.name + " successfully deleted.")});;
      if (this.type=="producers")
        this.personService.deleteProducer(person).subscribe(value=>{window.alert(person.name + " successfully deleted.")});;
      this.router.navigate(['listPeople/' + this.type])
    }
  }
}
