import { TestBed } from '@angular/core/testing';

import { ToothService } from './tooth.service';

describe('ToothService', () => {
  let service: ToothService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToothService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
