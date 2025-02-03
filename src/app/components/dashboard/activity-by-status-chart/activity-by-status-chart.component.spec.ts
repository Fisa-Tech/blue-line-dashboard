import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityByStatusChartComponent } from './activity-by-status-chart.component';

describe('ActivityByStatusChartComponent', () => {
  let component: ActivityByStatusChartComponent;
  let fixture: ComponentFixture<ActivityByStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityByStatusChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityByStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
