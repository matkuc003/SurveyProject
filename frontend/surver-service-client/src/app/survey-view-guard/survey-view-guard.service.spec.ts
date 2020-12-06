import { TestBed } from '@angular/core/testing';

import { SurveyViewGuardService } from './survey-view-guard.service';

describe('SurveyViewGuardService', () => {
  let service: SurveyViewGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyViewGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
