import { TestBed } from '@angular/core/testing';

import { DelateemployeeService } from './delateemployee.service';

describe('DelateemployeeService', () => {
  let service: DelateemployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelateemployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
