import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProducerComponent } from './info-producer.component';

describe('InfoProducerComponent', () => {
  let component: InfoProducerComponent;
  let fixture: ComponentFixture<InfoProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoProducerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
