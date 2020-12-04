import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSurveyComponent } from './results-survey.component';

describe('ResultsSurveyComponent', () => {
  let component: ResultsSurveyComponent;
  let fixture: ComponentFixture<ResultsSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
