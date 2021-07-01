import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../classes/Person';
import { Producer } from '../classes/Producer';
import { PeopleServiceService } from '../people-service.service';
import { ProducerServiceService } from '../producer-service.service';

@Component({
  selector: 'app-info-producer',
  templateUrl: './info-producer.component.html',
  styleUrls: ['./info-producer.component.css']
})
export class InfoProducerComponent implements OnInit {
  producer:Producer;
  id:number;
  constructor(private router: Router, private personService: PeopleServiceService, private producerService:ProducerServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSelectedProducer();
  }
  getSelectedProducer(){
    this.id = +this.route.snapshot.paramMap.get('id');
    this.producerService.getSelected(this.id).subscribe((data)=>this.producer=data);
  }

  editPerson(person) {
    this.personService.setSelectedPerson(person);
    this.router.navigate(['/editPerson/producers/' + person.id]);
  }

  deletePerson(person) {
    if (confirm(`Are you sure you want to delete ${person.name}?`)) {
      this.personService.deleteProducer(person).subscribe(value=>{window.alert(person.name + " successfully deleted.")});;
      this.router.navigate(['listPeople/producers'])
    }
  }
}
