import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';
import { ScrollAreaComponent } from '../ui/scroll-area.component';
import { ScheduleAuditService } from '../../shared/services/scheduleaudit/schedule-audit.service';
import { Router } from '@angular/router';
import { AuditRequestDto } from '../../models/supplier.model';

@Component({
  selector: 'app-completed-audits-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    ButtonComponent,
    BadgeComponent,
    ScrollAreaComponent
  ],
  templateUrl: './completed-audits-list.component.html',
  styleUrls: ['./completed-audits-list.component.scss']
})
export class CompletedAuditsListComponent {
  searchTerm = '';
  pageNumber = 1;
  pageSize = 5;
  totalRecords = 0;
  loading = false;
  completedAudits: any[] = [];

  constructor(private auditService: ScheduleAuditService) {
    this.getAudits();
  }

  private buildAuditRequestDto(): AuditRequestDto {
    return {
      statusId: 2,
      searchText: this.searchTerm || '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };
  }

  getAudits() {
    const filter = this.buildAuditRequestDto();
    this.auditService.getScheduledAudits(filter).subscribe({
      next: (res: any) => {
        this.completedAudits = res.records;
        this.totalRecords = res?.totalCount ?? 0;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.completedAudits = [];
        this.totalRecords = 0;
        this.pageNumber = 1;
        this.pageSize = 5;
      }
    });
  }

  getResultBadgeVariant(result: number): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (true) {
      case result >= 80:
        return "primary";
      case result >= 50:
        return "accent";
      case result < 50:
        return "destructive";
      default:
        return "default";
    }
  }

  getResultBadgeText(result: number): string {
    switch (true) {
      case result >= 80:
        return "Passed";
      case result >= 50:
        return "Passed with Conditions";
      case result < 50:
        return "Failed";
      default:
        return "";
    }
  }

  getScoreColor(score: number): string {
    if (score >= 90) return "score-high";
    if (score >= 75) return "score-medium";
    return "score-low";
  }

  onViewReport(audit: any): void {
    console.log('Viewing report for:', audit.supplier);
    // Handle view report logic here
  }

  getFormattedDateTime(isoString: string): string {
    const dateObj = new Date(isoString);

    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    //const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

    const formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
    //const formattedTime = dateObj.toLocaleTimeString('en-US', optionsTime);
    return `${formattedDate}`;
    //return `${formattedDate} at ${formattedTime}`;
  }


  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAudits();
    }
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.getAudits();
    }
  }
  canGoPrev(): boolean {
    return this.pageNumber > 1;
  }

  canGoNext(): boolean {
    return this.pageNumber * this.pageSize < this.totalRecords;
  }
  get totalPages(): number {
    return this.totalRecords > 0 ? Math.ceil(this.totalRecords / this.pageSize) : 1;
  }

  trackByAuditId(index: number, audit: any): string {
    return audit.id;
  }
}
