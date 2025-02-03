import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveChallengeComponent } from './remove-challenge.component';

describe('RemoveChallengeComponent', () => {
  let component: RemoveChallengeComponent;
  let fixture: ComponentFixture<RemoveChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveChallengeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
