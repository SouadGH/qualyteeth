import { TestBed } from '@angular/core/testing';

import { PractitionerService } from './dentist.service';

describe('PractitionerService', () => {
  let service: PractitionerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractitionerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
