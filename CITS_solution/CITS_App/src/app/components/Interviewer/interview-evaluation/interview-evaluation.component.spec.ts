import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewEvaluationComponent } from './interview-evaluation.component';

describe('InterviewEvaluationComponent', () => {
  let component: InterviewEvaluationComponent;
  let fixture: ComponentFixture<InterviewEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
