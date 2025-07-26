import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInterviewsComponent } from './search-interviews.component';

describe('SearchInterviewsComponent', () => {
  let component: SearchInterviewsComponent;
  let fixture: ComponentFixture<SearchInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInterviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
