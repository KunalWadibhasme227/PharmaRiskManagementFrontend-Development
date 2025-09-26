import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { ScheduleAuditService } from '../../shared/services/scheduleaudit/schedule-audit.service';
import { AuditRequestDto } from '../../models/supplier.model';

export interface CalendarAudit {
  auditId: string;
  supplierId: number;
  auditTypeName: string;
  auditDate: string;
  statusId: number;
  score?: number;
  //result?: "passed" | "passed-with-conditions" | "failed";
}

@Component({
  selector: 'app-audit-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    ButtonComponent
  ],
  templateUrl: './audit-calendar.component.html',
  styleUrls: ['./audit-calendar.component.scss']
})
export class AuditCalendarComponent {
  currentDate = new Date();

  calendarAudits: CalendarAudit[] = [
    // {
    //   auditId: "1",
    //   supplierId: "PharmaCorp Ltd",
    //   auditTypeName: "GMP Audit",
    //   audiDdate: "2025-01-15",
    //   time: "09:00 AM",
    //   status:1,
    // },
    // {
    //   id: "2",
    //   supplier: "MedTech Solutions",
    //   auditType: "Quality Audit",
    //   date: "2025-01-18",
    //   time: "10:30 AM",
    //   status: "upcoming",
    // },
    // {
    //   id: "3",
    //   supplier: "BioSupply Corp",
    //   auditType: "Compliance Audit",
    //   date: "2025-01-22",
    //   time: "02:00 PM",
    //   status: "upcoming",
    // },
    // {
    //   id: "4",
    //   supplier: "PharmaCorp Ltd",
    //   auditType: "GMP Audit",
    //   date: "2024-12-15",
    //   time: "09:00 AM",
    //   status: "completed",
    //   result: "passed",
    // },
    // {
    //   id: "5",
    //   supplier: "MedSupply Inc",
    //   auditType: "Compliance Audit",
    //   date: "2024-12-05",
    //   time: "01:00 PM",
    //   status: "completed",
    //   result: "failed",
    // },
  ];

  constructor(private auditService: ScheduleAuditService) {
    this.getAudits();
  }

  private buildAuditRequestDto(): AuditRequestDto {
    return {
      statusId: 0,
      searchText: '',
      pageNumber: 1,
      pageSize: 10000
    };
  }

  getAudits() {
    const filter = this.buildAuditRequestDto();
    this.auditService.getScheduledAudits(filter).subscribe({
      next: (res: any) => {
        this.calendarAudits = res.records;
        //this.totalRecords = res?.totalCount ?? 0;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.calendarAudits = [];

      }
    });
  }
  monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  get currentMonth(): number {
    return this.currentDate.getMonth();
  }

  get currentYear(): number {
    return this.currentDate.getFullYear();
  }

  get firstDayOfMonth(): Date {
    return new Date(this.currentYear, this.currentMonth, 1);
  }

  get lastDayOfMonth(): Date {
    return new Date(this.currentYear, this.currentMonth + 1, 0);
  }

  get firstDayWeekday(): number {
    return this.firstDayOfMonth.getDay();
  }

  get daysInMonth(): number {
    return this.lastDayOfMonth.getDate();
  }

  getStatusBadgeVariant(audit: CalendarAudit): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    if (audit.statusId === 1) return 'outline';


    const score = typeof audit.score === 'number' ? audit.score : NaN;
    if (!isNaN(score)) {
      if (score >= 80) return 'primary';
      if (score >= 50) return 'accent';
      return 'destructive';
    }
    return 'secondary';
  }

  getStatusBadgeText(audit: CalendarAudit): string {
    if (audit.statusId === 1) return 'Upcoming';


    const score = typeof audit.score === 'number' ? audit.score : NaN;
    if (!isNaN(score)) {
      if (score >= 80) return 'Passed';
      if (score >= 50) return 'Conditional';
      return 'Failed';
    }
    return 'Completed';
  }

  getFormattedDateTime(isoString: string): string {
    if (!isoString) return '---';
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return 'Invalid Date';


    //const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    //const formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
    const formattedTime = dateObj.toLocaleTimeString('en-US', optionsTime);
    return `  at ${formattedTime}`;
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1);
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1);
  }

  getAuditsForDate(day: number): CalendarAudit[] {
    const yyyy = this.currentYear;
    const mm = String(this.currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`; // e.g. 2025-10-01


    if (!Array.isArray(this.calendarAudits) || this.calendarAudits.length === 0) {
      return [];
    }
    return this.calendarAudits.filter(audit => {
      const raw = (audit.auditDate ?? (audit as any).AuditDate ?? '').toString();
      if (!raw) return false;
      const auditDatePart = raw.length >= 10 ? raw.substring(0, 10) : raw;
      // debug
      // console.log('compare', auditDatePart, 'with', dateStr, 'raw=', raw);
      return auditDatePart === dateStr;
    });
  }

  getCalendarDays(): Array<{ day: number; audits: CalendarAudit[] } | null> {
    const days = [];
    for (let i = 0; i < this.firstDayWeekday; i++) days.push(null);
    for (let day = 1; day <= this.daysInMonth; day++) {
      const auditsForDay = this.getAuditsForDate(day);
      days.push({ day, audits: auditsForDay });
    }
    return days;
  }

  // return wrapper class: 'audit-pending' or 'audit-completed'
  getAuditClass(audit: CalendarAudit): string {
    // treat status === 1 as pending/upcoming
    if (audit && audit.statusId === 1) {
      return 'audit-pending';
    }
    return 'audit-completed';
  }

  // small dot class — optional, but kept simple
  getAuditDotClass(audit: CalendarAudit): string {
    return audit && audit.statusId === 1 ? 'dot-pending' : 'dot-completed';
  }
  onAuditClick(audit: CalendarAudit): void {
    console.log('Audit clicked:', audit.supplierId);
    // Handle audit click logic here
  }

  trackByAuditId(index: number, audit: CalendarAudit): string {
    return audit.auditId;
  }
}
