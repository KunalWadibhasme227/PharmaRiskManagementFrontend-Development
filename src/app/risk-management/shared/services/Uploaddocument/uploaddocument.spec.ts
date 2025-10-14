import { TestBed } from '@angular/core/testing';

import { Uploaddocument } from './uploaddocument';

describe('Uploaddocument', () => {
  let service: Uploaddocument;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Uploaddocument);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
