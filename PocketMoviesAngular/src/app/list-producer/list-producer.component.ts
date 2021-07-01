import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producer } from '../classes/Producer';
import { ProducerServiceService } from '../producer-service.service';

@Component({
  selector: 'app-list-producer',
  templateUrl: './list-producer.component.html',
  styleUrls: ['./list-producer.component.css']
})
export class ListProducerComponent implements OnInit {
  producer_list:Producer[];
  constructor(private producerService:ProducerServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducers();
  }
  getProducers(){
    this.producerService.getProducer().subscribe(list=>this.producer_list=list["results"]);
  }
}
