import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProgressComponent } from './candidate-progress.component';

describe('CandidateProgressComponent', () => {
  let component: CandidateProgressComponent;
  let fixture: ComponentFixture<CandidateProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
