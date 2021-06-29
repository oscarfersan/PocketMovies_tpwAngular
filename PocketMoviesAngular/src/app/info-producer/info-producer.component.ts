import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producer } from '../classes/Producer';
import { ProducerServiceService } from '../producer-service.service';

@Component({
  selector: 'app-info-producer',
  templateUrl: './info-producer.component.html',
  styleUrls: ['./info-producer.component.css']
})
export class InfoProducerComponent implements OnInit {
  producer:Producer;
  id:number;
  constructor(private producerService:ProducerServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSelectedProducer();
  }
  getSelectedProducer(){
    this.id = +this.route.snapshot.paramMap.get('id');
    this.producerService.getSelected(this.id).subscribe((data)=>this.producer=data);
  }
}
