import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChallengesChartComponent } from './new-challenges-chart.component';

describe('NewChallengesChartComponent', () => {
  let component: NewChallengesChartComponent;
  let fixture: ComponentFixture<NewChallengesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewChallengesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewChallengesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
