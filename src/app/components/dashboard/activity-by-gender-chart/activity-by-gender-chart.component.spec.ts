import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityByGenderChartComponent } from './activity-by-gender-chart.component';

describe('ActivityByGenderChartComponent', () => {
  let component: ActivityByGenderChartComponent;
  let fixture: ComponentFixture<ActivityByGenderChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityByGenderChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityByGenderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
