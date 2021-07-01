import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../classes/Person';
import { PeopleServiceService } from '../people-service.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  person: Person;
  type: string;

  constructor(private peopleService: PeopleServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.person = this.peopleService.getSelectedPerson;
    this.type = this.route.snapshot.paramMap.get('type');
    let id = +this.route.snapshot.paramMap.get('id');
    if (id != this.person.id)
      this.router.navigate([`/${this.type}/${id}`]);
  }

  saveChanges() {
    if (this.type=="actors")
      this.peopleService.editActor(this.person).subscribe(value=>{
        this.router.navigate(['/person/' + this.type + '/' + this.person.id]);
        window.alert("Actor successfully edited.");
      },
      error=>{
        window.alert("Error editting actor.");
      });
    if (this.type=="directors")
      this.peopleService.editDirector(this.person).subscribe(value=>{
        this.router.navigate(['/person/' + this.type + '/' + this.person.id]);
        window.alert("Director successfully edited.");
      },
      error=>{
        window.alert("Error editting director.");
      });
    if (this.type=="producers")
      this.peopleService.editProducer(this.person).subscribe(value=>{
        this.router.navigate(['/person/' + this.type + '/' + this.person.id]);
        window.alert("Producer successfully edited.");
      },
      error=>{
        window.alert("Error editting producer.");
      });
    
  }

}
