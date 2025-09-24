import { TestBed } from '@angular/core/testing';
import { ScheduleAuditService } from './schedule-audit.service';


describe('ScheduleAuditService', () => {
  let service: ScheduleAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
