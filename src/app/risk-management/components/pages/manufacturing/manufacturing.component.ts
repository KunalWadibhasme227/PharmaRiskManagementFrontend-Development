import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';
import { BadgeComponent } from '../../ui/badge.component';
import { ButtonComponent } from '../../ui/button.component';
import { InputComponent } from '../../ui/input.component';

export interface ManufacturingAudit {
  id: number;
  facility: string;
  location: string;
  auditType: string;
  status: "In Progress" | "Completed" | "Scheduled";
  score: number | null;
  date: string;
  auditor: string;
  findings: number;
}

@Component({
  selector: 'app-manufacturing',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    CardComponent,
    CardContentComponent,
    CardDescriptionComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './manufacturing.component.html',
  styleUrls: ['./manufacturing.component.scss']
})
export class ManufacturingComponent implements OnInit {
  activeTab = 'audits';

  manufacturingAudits: ManufacturingAudit[] = [
    {
      id: 1,
      facility: "PharmaCorp Manufacturing",
      location: "New Jersey, USA",
      auditType: "GMP Compliance",
      status: "In Progress",
      score: 85,
      date: "2024-01-15",
      auditor: "Dr. Sarah Johnson",
      findings: 3,
    },
    {
      id: 2,
      facility: "BioTech Production",
      location: "California, USA",
      auditType: "Quality Control",
      status: "Completed",
      score: 92,
      date: "2024-01-10",
      auditor: "Michael Chen",
      findings: 1,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onScheduleNewAudit(): void {
    console.log('Scheduling new audit');
    // Handle schedule new audit logic here
  }

  onViewDetails(audit: ManufacturingAudit): void {
    console.log('Viewing details for audit:', audit.facility);
    // Handle view details logic here
  }

  onViewReport(audit: ManufacturingAudit): void {
    console.log('Viewing report for audit:', audit.facility);
    // Handle view report logic here
  }

  getStatusBadgeVariant(status: ManufacturingAudit["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Scheduled":
        return "outline";
      default:
        return "default";
    }
  }

  getScoreDisplay(score: number | null): string {
    return score ? `${score}%` : "Pending";
  }

  trackByAuditId(index: number, audit: ManufacturingAudit): number {
    return audit.id;
  }
}
