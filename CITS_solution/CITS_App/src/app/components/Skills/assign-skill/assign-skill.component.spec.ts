import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSkillComponent } from './assign-skill.component';

describe('AssignSkillComponent', () => {
  let component: AssignSkillComponent;
  let fixture: ComponentFixture<AssignSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
