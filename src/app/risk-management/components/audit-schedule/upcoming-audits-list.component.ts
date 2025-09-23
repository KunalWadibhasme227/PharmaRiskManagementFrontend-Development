import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { BadgeComponent } from '../ui/badge.component';
import { ScrollAreaComponent } from '../ui/scroll-area.component';
import { SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent } from '../ui/select.component';

export interface UpcomingAudit {
  id: string;
  supplier: string;
  auditType: string;
  date: string;
  time: string;
  duration: string;
  status: "scheduled" | "confirmed" | "pending" | "in-progress";
  auditor: string;
  location: string;
  priority: "high" | "medium" | "low";
}

@Component({
  selector: 'app-upcoming-audits-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    ButtonComponent,
    InputComponent,
    BadgeComponent,
    ScrollAreaComponent,
    SelectComponent,
    SelectTriggerComponent,
    SelectContentComponent,
    SelectItemComponent
  ],
  templateUrl: './upcoming-audits-list.component.html',
  styleUrls: ['./upcoming-audits-list.component.scss']
})
export class UpcomingAuditsListComponent {
  searchTerm = '';
  filterStatus = 'all';

  upcomingAudits: UpcomingAudit[] = [
    {
      id: "1",
      supplier: "PharmaCorp Ltd",
      auditType: "GMP Audit",
      date: "2025-01-15",
      time: "09:00 AM",
      duration: "4 hours",
      status: "confirmed",
      auditor: "Sarah Johnson",
      location: "Boston, MA",
      priority: "high",
    },
    {
      id: "2",
      supplier: "MedTech Solutions",
      auditType: "Quality Audit",
      date: "2025-01-18",
      time: "10:30 AM",
      duration: "6 hours",
      status: "scheduled",
      auditor: "Michael Chen",
      location: "Chicago, IL",
      priority: "medium",
    },
    {
      id: "3",
      supplier: "BioSupply Corp",
      auditType: "Compliance Audit",
      date: "2025-01-22",
      time: "02:00 PM",
      duration: "3 hours",
      status: "pending",
      auditor: "Emily Davis",
      location: "San Diego, CA",
      priority: "low",
    },
    {
      id: "4",
      supplier: "GlobalMed Corp",
      auditType: "FDA Inspection",
      date: "2025-01-25",
      time: "08:00 AM",
      duration: "8 hours",
      status: "confirmed",
      auditor: "Robert Wilson",
      location: "New York, NY",
      priority: "high",
    },
    {
      id: "5",
      supplier: "ChemSource Ltd",
      auditType: "ISO Audit",
      date: "2025-01-28",
      time: "01:00 PM",
      duration: "5 hours",
      status: "scheduled",
      auditor: "Lisa Anderson",
      location: "Houston, TX",
      priority: "medium",
    },
  ];

  get filteredAudits(): UpcomingAudit[] {
    return this.upcomingAudits.filter((audit) => {
      const matchesSearch =
        audit.supplier.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        audit.auditType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        audit.auditor.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === "all" || audit.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

  getStatusBadgeVariant(status: UpcomingAudit["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "confirmed":
        return "primary";
      case "scheduled":
        return "outline";
      case "pending":
        return "accent";
      case "in-progress":
        return "secondary";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: UpcomingAudit["status"]): string {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "scheduled":
        return "Scheduled";
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      default:
        return "";
    }
  }

  getPriorityBadgeVariant(priority: UpcomingAudit["priority"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "accent";
      case "low":
        return "primary";
      default:
        return "default";
    }
  }

  getPriorityBadgeText(priority: UpcomingAudit["priority"]): string {
    switch (priority) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "";
    }
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  onFilterChange(filterStatus: string): void {
    this.filterStatus = filterStatus;
  }

  onScheduleAudit(): void {
    console.log('Scheduling new audit');
    // Handle schedule audit logic here
  }

  onViewDetails(audit: UpcomingAudit): void {
    console.log('Viewing details for:', audit.supplier);
    // Handle view details logic here
  }

  onReschedule(audit: UpcomingAudit): void {
    console.log('Rescheduling audit for:', audit.supplier);
    // Handle reschedule logic here
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  trackByAuditId(index: number, audit: UpcomingAudit): string {
    return audit.id;
  }
}
