import { ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { ScheduleAuditService } from '../../shared/services/scheduleaudit/schedule-audit.service';
import { AuditRequestDto } from '../../models/supplier.model';
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarModule } from 'angular-calendar';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideCalendar, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

export interface CalendarAudit {
  auditId: string;
  supplierId: number | string;
  auditTypeName: string;
  auditDate: string;
  statusId: number;
  score?: number;
}

const colors = {
  red: { primary: 'oklch(0.627 0.265 70.08)', secondary: '#FAE3E3' },
  yellow: { primary: 'oklch(0.567 0.175 199.228)', secondary: '#FDF1BA' },
  blue: { primary: 'oklch(0.567 0.175 199.228)', secondary: '#D1E8FF' },
};

@Component({
  selector: 'app-audit-calendar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, FormsModule,
    NgbModule, CalendarModule, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent
  ],
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  templateUrl: './audit-calendar.component.html',
  styleUrls: ['./audit-calendar.component.scss']
})
export class AuditCalendarComponent {
  currentDate = new Date();
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  activeDayIsOpen = true;
  refresh = new Subject<void>();

  modalData?: { action?: string; event: CalendarEvent };
  events: CalendarEvent[] = [];
  private modal = inject(NgbModal);
  countupcoming: number = 0;
  countcompleted: number = 0;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-pencil-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }) => this.handleEvent('Edited', event)
    },
    {
      label: '<i class="fas fa-trash-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }) => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  calendarAudits: CalendarAudit[] = [];

  constructor(private auditService: ScheduleAuditService) {
    this.getAudits();
  }

  private buildAuditRequestDto(): AuditRequestDto {
    return { statusId: 0, searchText: '', pageNumber: 1, pageSize: 10000 };
  }

  getAudits() {
    const filter = this.buildAuditRequestDto();
    this.auditService.getScheduledAudits(filter).subscribe({
      next: (res: any) => {
        this.calendarAudits = Array.isArray(res?.records) ? res.records : [];
        this.loadAudits(this.calendarAudits);
      },
      error: (err: any) => {
        console.error(err);
        this.calendarAudits = [];
        this.loadAudits([]);
      }
    });
  }

  loadAudits(calendarAudits: CalendarAudit[]) {
    this.events = calendarAudits.map(audit => {
      const startDate = new Date(audit.auditDate);
      const endDate = new Date(startDate.getTime() + (2 * 60 * 1000)); // 2 hour duration
      if (this.currentMonth === startDate.getMonth()) {
        if (audit.statusId === 1) {
          this.countupcoming++;
        }
        else {
          this.countcompleted++;
        }
      }
      return {
        start: startDate,
        end: endDate,
        title: `${audit.auditTypeName} - Supplier: ${audit.supplierId}`,
        color: this.getEventColor(audit.statusId),
        allDay: false,
        meta: audit
      };
    });
    this.refresh.next();
  }

  getEventColor(statusId: number) {
    switch (statusId) {
      case 1: return colors.red;
      case 2: return colors.yellow;
      case 3: return colors.blue;
      default: return colors.blue;
    }
  }

  handleEvent(actionOrEvent: string | CalendarEvent, maybeEvent?: CalendarEvent) {
    let action: string | undefined;
    let event: CalendarEvent | undefined;

    if (typeof actionOrEvent === 'string') {
      action = actionOrEvent;
      event = maybeEvent;
    } else {
      action = 'Clicked';
      event = actionOrEvent;
    }

    if (!event) return;

    this.modalData = { action, event };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    if (date.getMonth() === this.viewDate.getMonth()) {
      this.activeDayIsOpen = !(this.viewDate.getDate() === date.getDate() && this.activeDayIsOpen) && events.length > 0;
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) { this.view = view; }
  closeOpenMonthViewDay() { this.activeDayIsOpen = false; }

  get currentMonth(): number { return this.currentDate.getMonth(); }
  get currentYear(): number { return this.currentDate.getFullYear(); }
  get firstDayOfMonth(): Date { return new Date(this.currentYear, this.currentMonth, 1); }
  get lastDayOfMonth(): Date { return new Date(this.currentYear, this.currentMonth + 1, 0); }
  get firstDayWeekday(): number { return this.firstDayOfMonth.getDay(); }
  get daysInMonth(): number { return this.lastDayOfMonth.getDate(); }

  previousMonth(): void { this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1); }
  nextMonth(): void { this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1); }

  getAuditClass(audit: CalendarAudit): string { return audit.statusId === 1 ? 'audit-pending' : 'audit-completed'; }
  getAuditDotClass(audit: CalendarAudit): string { return audit.statusId === 1 ? 'dot-pending' : 'dot-completed'; }
  onAuditClick(audit: CalendarAudit): void { console.log('Audit clicked:', audit.supplierId); }
}
