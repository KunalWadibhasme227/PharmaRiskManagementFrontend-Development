import { TestBed } from '@angular/core/testing';

import { Commonservice } from './commonservice.service';

describe('Commonservice', () => {
  let service: Commonservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Commonservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
