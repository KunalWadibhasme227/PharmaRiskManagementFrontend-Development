import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';
import { TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent } from '../ui/tabs.component';
import { Findingservice } from '../../services/Findings/findingservice';

export interface Finding {
  id: string;
  name: string;
  description: string;
  supplier: string;
  category: "critical" | "major" | "minor";
  dateIdentified: string;
  dueDate: string;
  assignee: string;
  progress: number;
  status: "open" | "overdue" | "closed";
}

@Component({
  selector: 'app-findings-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    ButtonComponent,
    BadgeComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent
  ],
  templateUrl: './findings-list.component.html',
  styleUrls: ['./findings-list.component.scss']
})
export class FindingsListComponent {
  activeTab = 'open';

  // findings: Finding[] = [
  //   {
  //     id: "1",
  //     name: "Documentation Gap in Quality Manual",
  //     description: "Missing procedures for batch record review process",
  //     supplier: "PharmaCorp Ltd",
  //     category: "major",
  //     dateIdentified: "2024-12-01",
  //     dueDate: "2025-01-15",
  //     assignee: "Sarah Johnson",
  //     progress: 75,
  //     status: "open",
  //   },
  //   {
  //     id: "2",
  //     name: "Temperature Monitoring System Failure",
  //     description: "Cold storage unit temperature exceeded limits for 2 hours",
  //     supplier: "MedSupply Inc",
  //     category: "critical",
  //     dateIdentified: "2024-11-28",
  //     dueDate: "2024-12-28",
  //     assignee: "Michael Chen",
  //     progress: 45,
  //     status: "overdue",
  //   },
  //   {
  //     id: "3",
  //     name: "Training Record Incomplete",
  //     description: "Operator training records missing for new equipment",
  //     supplier: "BioTech Solutions",
  //     category: "minor",
  //     dateIdentified: "2024-11-15",
  //     dueDate: "2024-12-15",
  //     assignee: "Emily Davis",
  //     progress: 100,
  //     status: "closed",
  //   },
  //];
  

  constructor(private findingservice : Findingservice){
    this.getFindingList(this.activeTab);
  }
  filteredFindings: any[]=[]

  getCategoryBadgeVariant(category: Finding["category"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (category) {
      case "critical":
        return "destructive";
      case "major":
        return "accent";
      case "minor":
        return "primary";
      default:
        return "default";
    }
  }

  getCategoryBadgeText(category: Finding["category"]): string {
    switch (category) {
      case "critical":
        return "Critical";
      case "major":
        return "Major";
      case "minor":
        return "Minor";
      default:
        return "";
    }
  }

  getStatusBadgeVariant(status: Finding["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "open":
        return "outline";
      case "overdue":
        return "destructive";
      case "closed":
        return "primary";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: Finding["status"]): string {
    switch (status) {
      case "open":
        return "Open";
      case "overdue":
        return "Overdue";
      case "closed":
        return "Closed";
      default:
        return "";
    }
  }

  onTabChange(tabValue: string): void {
    this.getFindingList(tabValue);
    this.activeTab = tabValue;
  }
  getFindingList(value:any)
  {
    this.findingservice.getfindings(value).subscribe({
      next: (response : any) => {
        this.filteredFindings = response;
      },
      error: (err : any) => {
        console.error('Error adding finding', err);
        // Optionally show an error message to the user
      }
    });
  }

  onViewDetails(finding: Finding): void {
    console.log('Viewing details for:', finding.name);
    // Handle view details logic here
  }

  onUpdateProgress(finding: Finding): void {
    console.log('Updating progress for:', finding.name);
    // Handle update progress logic here
  }

  onMarkComplete(finding: Finding): void {
    console.log('Marking complete:', finding.name);
    // Handle mark complete logic here
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  trackByFindingId(index: number, finding: Finding): string {
    return finding.id;
  }
}
