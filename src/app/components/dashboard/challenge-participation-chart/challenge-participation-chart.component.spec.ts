import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeParticipationChartComponent } from './challenge-participation-chart.component';

describe('ChallengeParticipationChartComponent', () => {
  let component: ChallengeParticipationChartComponent;
  let fixture: ComponentFixture<ChallengeParticipationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeParticipationChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChallengeParticipationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
