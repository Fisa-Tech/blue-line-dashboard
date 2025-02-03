import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventsChartComponent } from './new-events-chart.component';

describe('NewEventsChartComponent', () => {
  let component: NewEventsChartComponent;
  let fixture: ComponentFixture<NewEventsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEventsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEventsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
