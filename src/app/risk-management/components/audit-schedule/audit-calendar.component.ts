import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';

export interface CalendarAudit {
  id: string;
  supplier: string;
  auditType: string;
  date: string;
  time: string;
  status: "upcoming" | "completed";
  result?: "passed" | "passed-with-conditions" | "failed";
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
    {
      id: "1",
      supplier: "PharmaCorp Ltd",
      auditType: "GMP Audit",
      date: "2025-01-15",
      time: "09:00 AM",
      status: "upcoming",
    },
    {
      id: "2",
      supplier: "MedTech Solutions",
      auditType: "Quality Audit",
      date: "2025-01-18",
      time: "10:30 AM",
      status: "upcoming",
    },
    {
      id: "3",
      supplier: "BioSupply Corp",
      auditType: "Compliance Audit",
      date: "2025-01-22",
      time: "02:00 PM",
      status: "upcoming",
    },
    {
      id: "4",
      supplier: "PharmaCorp Ltd",
      auditType: "GMP Audit",
      date: "2024-12-15",
      time: "09:00 AM",
      status: "completed",
      result: "passed",
    },
    {
      id: "5",
      supplier: "MedSupply Inc",
      auditType: "Compliance Audit",
      date: "2024-12-05",
      time: "01:00 PM",
      status: "completed",
      result: "failed",
    },
  ];

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
    if (audit.status === "upcoming") {
      return "outline";
    } else {
      switch (audit.result) {
        case "passed":
          return "primary";
        case "passed-with-conditions":
          return "accent";
        case "failed":
          return "destructive";
        default:
          return "secondary";
      }
    }
  }

  getStatusBadgeText(audit: CalendarAudit): string {
    if (audit.status === "upcoming") {
      return "Upcoming";
    } else {
      switch (audit.result) {
        case "passed":
          return "Passed";
        case "passed-with-conditions":
          return "Conditional";
        case "failed":
          return "Failed";
        default:
          return "Completed";
      }
    }
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1);
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1);
  }

  getAuditsForDate(day: number): CalendarAudit[] {
    const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return this.calendarAudits.filter((audit) => audit.date === dateStr);
  }

  getCalendarDays(): Array<{ day: number; audits: CalendarAudit[] } | null> {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < this.firstDayWeekday; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= this.daysInMonth; day++) {
      const auditsForDay = this.getAuditsForDate(day);
      days.push({ day, audits: auditsForDay });
    }

    return days;
  }

  onAuditClick(audit: CalendarAudit): void {
    console.log('Audit clicked:', audit.supplier);
    // Handle audit click logic here
  }

  trackByAuditId(index: number, audit: CalendarAudit): string {
    return audit.id;
  }
}
