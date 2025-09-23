import { TestBed } from '@angular/core/testing';

import { SupplierStateService } from './supplier-state.service';

describe('SupplierStateService', () => {
  let service: SupplierStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
