import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { BadgeComponent } from '../ui/badge.component';
import { ScrollAreaComponent } from '../ui/scroll-area.component';
import { ScheduleAuditService } from '../../shared/services/scheduleaudit/schedule-audit.service';
import { AuditRequestDto } from '../../models/supplier.model';
import { Router } from '@angular/router';
import { SupplierStateService } from '../../shared/services/suppliers/supplier-state.service';
import { RemainingDurationPipe } from '../../models/remaining-duration.pipe';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { tap } from 'rxjs';
import { ScheduleAuditFormData, Scheduleauditscomponent } from './scheduleauditscomponent/scheduleauditscomponent';
import { MatDialog } from '@angular/material/dialog';

// export interface UpcomingAudit {
//   id: string;
//   supplier: string;
//   auditType: string;
//   date: string;
//   time: string;
//   duration: string;
//   status: "scheduled" | "confirmed" | "pending" | "in-progress";
//   auditor: string;
//   location: string;
//   priority: "high" | "medium" | "low";
// }

@Component({
  selector: 'app-upcoming-audits-list',
  standalone: true,
  imports: [
    CommonModule, CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, ButtonComponent,
    InputComponent, BadgeComponent, ScrollAreaComponent, Scheduleauditscomponent, RemainingDurationPipe 
  ],
  templateUrl: './upcoming-audits-list.component.html',
  styleUrls: ['./upcoming-audits-list.component.scss']
})
export class UpcomingAuditsListComponent {
  searchTerm = '';
  filterStatus = 'all';
  isScheduleModalOpen = false;
  pageNumber = 1;
  pageSize = 5;
  totalRecords = 0;
  loading = false;
  auditdetailbyId: any;

  constructor(private auditService : ScheduleAuditService,private router: Router, private supplierState : SupplierStateService,
    private notify: NotificationService, private dialog: MatDialog
  ) {

        this.getAudits();

  }
  
upcomingAudits: any[] = [];

  ngOnInit(): void {
  }
  private buildAuditRequestDto(): AuditRequestDto {
    return {
      statusId: 1,
      searchText: this.searchTerm || '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };
  }
  getAudits(){
    const filter = this.buildAuditRequestDto();
    this.auditService.getScheduledAudits(filter).subscribe({
      next: (res : any) => {
        this.upcomingAudits = res.records;
        this.totalRecords = res?.totalCount ?? 0;
        console.log(res);
      },
      error: (err : any) => {
        console.log(err);
        this.upcomingAudits = [];
        this.totalRecords = 0;
      this.pageNumber = 1;
      this.pageSize = 5;
      }
    });
  }
  
  getStatusBadgeVariant(status: number): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
  switch (status) {
    case 1: // Pending
      return "accent";
    case 2: // Completed
      return "primary";
    default:
      return "default";
  }
}

getStatusBadgeText(status: number): string {
  switch (status) {
    case 1:
      return "Pending";
    case 2:
      return "Completed";
    default:
      return "---";
  }
}


  onSearchChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.searchTerm = target.value;
  if(this.searchTerm.length>=3)
  { this.getAudits();}
  if(this.searchTerm.length==0)
  { this.getAudits();}
}


  onFilterChange(filterStatus: string): void {
    this.filterStatus = filterStatus;
  }

  onScheduleAudit(): void {
    const dialogRef = this.dialog.open(Scheduleauditscomponent, {
          width: '800px',
          panelClass: 'audit-dialog-panel'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Audit Form Submitted:', result);
            // send result to backend via service
          }
        });
  }

  onScheduleModalClose(): void {
    this.isScheduleModalOpen = false;
    this.auditdetailbyId = undefined;
    this.getAudits();
  }

  onScheduleModalSubmit(formData: ScheduleAuditFormData): void {
    console.log('Scheduling new audit with data:', formData);
    // Handle schedule audit logic here
    // For now, we'll just close the modal
    this.isScheduleModalOpen = false;
    this.getAudits();
  }

  onViewDetails(audit: any): void {
    this.supplierState.setSupplier(audit);
    this.router.navigate(['/audits/view']);
  }

 onReschedule(auditId: string): void {
  // if (!audit) return;

  // this.auditService.getAuditById(audit.auditId).pipe(
  //   tap((res: any) => this.auditdetailbyId = res)
  // ).subscribe({
  //   next: () => {
  //     this.supplierState.setSupplier(this.auditdetailbyId);
  //     this.isScheduleModalOpen = true;
  //     console.log('Rescheduling audit for:', this.auditdetailbyId);
  //   },
  //   error: () => {
  //     this.notify.Error('Failed to fetch audit details');
  //   }
  // });
  const ref = this.dialog.open(Scheduleauditscomponent, {
      width: '800px',
      data: { id: auditId }
    });

    ref.afterClosed().subscribe(() => {
    this.getAudits();
    });
}
// UpdateProgressDialog(finding: string): void {
//     const ref = this.dialog.open(Addfindings, {
//       width: '800px',
//       data: { id: finding }
//     });

//     ref.afterClosed().subscribe(() => {
//       this.getFindingList(this.activeTab);
//     });
//   }

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
  getFormattedDateTime(isoString: string): string {
  const dateObj = new Date(isoString);

  const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
  const formattedTime = dateObj.toLocaleTimeString('en-US', optionsTime);

  return `${formattedDate} at ${formattedTime}`;
}

getRemainingDuration(isoString: string): string {
  const now = new Date();
  const target = new Date(isoString);

  let diffMs = target.getTime() - now.getTime(); // difference in ms

  if (diffMs <= 0) {
    return 'Expired'; // already passed
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays}d ${diffHours}h ${diffMinutes}m remaining`;
  } else if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m remaining`;
  } else {
    return `${diffMinutes}m remaining`;
  }
}


  // trackByAuditId(index: number, audit: UpcomingAudit): string {
  //   return audit.id;
  // }

}
