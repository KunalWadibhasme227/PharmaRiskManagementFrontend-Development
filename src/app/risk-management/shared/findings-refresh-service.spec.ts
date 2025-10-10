import { TestBed } from '@angular/core/testing';

import { FindingsRefreshService } from './findings-refresh-service';

describe('FindingsRefreshService', () => {
  let service: FindingsRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindingsRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
