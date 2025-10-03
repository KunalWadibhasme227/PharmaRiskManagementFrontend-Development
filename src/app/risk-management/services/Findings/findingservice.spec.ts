import { TestBed } from '@angular/core/testing';

import { Findingservice } from './findingservice';

describe('Findingservice', () => {
  let service: Findingservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Findingservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
