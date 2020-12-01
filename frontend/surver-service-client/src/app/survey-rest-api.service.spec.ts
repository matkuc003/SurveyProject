import { TestBed } from '@angular/core/testing';

import { SurveyRestApiService } from './survey-rest-api.service';

describe('SurveyRestApiService', () => {
  let service: SurveyRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
