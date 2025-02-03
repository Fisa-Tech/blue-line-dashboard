import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticipationChartComponent } from './event-participation-chart.component';

describe('EventParticipationChartComponent', () => {
  let component: EventParticipationChartComponent;
  let fixture: ComponentFixture<EventParticipationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventParticipationChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventParticipationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
