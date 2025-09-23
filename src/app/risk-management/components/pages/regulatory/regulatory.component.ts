import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';
import { BadgeComponent } from '../../ui/badge.component';
import { ButtonComponent } from '../../ui/button.component';
import { ProgressComponent } from '../../ui/progress.component';

export interface Regulation {
  id: number;
  name: string;
  description: string;
  status: "Compliant" | "Under Review" | "Action Required";
  lastReview: string;
  nextReview: string;
  compliance: number;
}

export interface Requirement {
  category: string;
  completed: number;
  total: number;
  percentage: number;
}

@Component({
  selector: 'app-regulatory',
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
    ProgressComponent
  ],
  templateUrl: './regulatory.component.html',
  styleUrls: ['./regulatory.component.scss']
})
export class RegulatoryComponent implements OnInit {
  activeTab = 'regulations';

  regulations: Regulation[] = [
    {
      id: 1,
      name: "FDA 21 CFR Part 211",
      description: "Current Good Manufacturing Practice",
      status: "Compliant",
      lastReview: "2024-01-10",
      nextReview: "2024-07-10",
      compliance: 95,
    },
    {
      id: 2,
      name: "ICH Q7 Guidelines",
      description: "Good Manufacturing Practice for APIs",
      status: "Under Review",
      lastReview: "2023-12-15",
      nextReview: "2024-06-15",
      compliance: 88,
    },
    {
      id: 3,
      name: "EU GMP Guidelines",
      description: "European Good Manufacturing Practice",
      status: "Action Required",
      lastReview: "2023-11-20",
      nextReview: "2024-05-20",
      compliance: 78,
    },
  ];

  requirements: Requirement[] = [
    { category: "Documentation", completed: 45, total: 50, percentage: 90 },
    { category: "Training", completed: 28, total: 30, percentage: 93 },
    { category: "Validation", completed: 15, total: 20, percentage: 75 },
    { category: "Quality Control", completed: 38, total: 40, percentage: 95 },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onAddRegulation(): void {
    console.log('Adding new regulation');
    // Handle add regulation logic here
  }

  onViewDetails(regulation: Regulation): void {
    console.log('Viewing details for regulation:', regulation.name);
    // Handle view details logic here
  }

  onGenerateReport(regulation: Regulation): void {
    console.log('Generating report for regulation:', regulation.name);
    // Handle generate report logic here
  }

  onCreateSubmission(): void {
    console.log('Creating new submission');
    // Handle create submission logic here
  }

  getStatusBadgeVariant(status: Regulation["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "Compliant":
        return "default";
      case "Under Review":
        return "secondary";
      case "Action Required":
        return "destructive";
      default:
        return "default";
    }
  }

  getStatusIcon(percentage: number): string {
    if (percentage >= 90) return "✅";
    if (percentage >= 75) return "⏰";
    return "⚠️";
  }

  getStatusIconClass(percentage: number): string {
    if (percentage >= 90) return "status-icon-success";
    if (percentage >= 75) return "status-icon-warning";
    return "status-icon-error";
  }

  trackByRegulationId(index: number, regulation: Regulation): number {
    return regulation.id;
  }

  trackByRequirementCategory(index: number, requirement: Requirement): string {
    return requirement.category;
  }
}
