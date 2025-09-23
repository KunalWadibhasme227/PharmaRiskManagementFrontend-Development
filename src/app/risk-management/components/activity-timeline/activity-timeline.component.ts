import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';
import { ScrollAreaComponent } from '../ui/scroll-area.component';

export interface Activity {
  id: string;
  type: "audit_completed" | "finding_identified" | "supplier_registered" | "report_generated";
  title: string;
  description: string;
  timestamp: string;
  status: "compliant" | "critical" | "new" | "complete";
  priority?: "high" | "medium" | "low";
}

@Component({
  selector: 'app-activity-timeline',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    BadgeComponent,
    ScrollAreaComponent
  ],
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss']
})
export class ActivityTimelineComponent {
  activities: Activity[] = [
    {
      id: "1",
      type: "audit_completed",
      title: "Supplier Audit Completed",
      description: "PharmaCorp Ltd - Compliant",
      timestamp: "2 hours ago",
      status: "compliant",
    },
    {
      id: "2",
      type: "finding_identified",
      title: "Critical Finding Identified",
      description: "MedSupply Inc - Documentation Issue",
      timestamp: "4 hours ago",
      status: "critical",
      priority: "high",
    },
    {
      id: "3",
      type: "supplier_registered",
      title: "New Supplier Registered",
      description: "BioTech Solutions - API Manufacturer",
      timestamp: "1 day ago",
      status: "new",
    },
    {
      id: "4",
      type: "report_generated",
      title: "Compliance Report Generated",
      description: "Q4 2024 FDA Compliance Report",
      timestamp: "2 days ago",
      status: "complete",
    },
    {
      id: "5",
      type: "audit_completed",
      title: "Quality Audit Completed",
      description: "GlobalMed Corp - Minor Issues Found",
      timestamp: "3 days ago",
      status: "compliant",
    },
  ];

  getActivityColor(status: Activity["status"]): string {
    switch (status) {
      case "compliant":
        return "activity-dot-compliant";
      case "critical":
        return "activity-dot-critical";
      case "new":
        return "activity-dot-new";
      case "complete":
        return "activity-dot-complete";
      default:
        return "activity-dot-default";
    }
  }

  getStatusBadgeVariant(status: Activity["status"]):'default' | 'destructive' | 'outline' | 'secondary' | 'primary' | 'accent' {
    switch (status) {
      case "compliant":
        return "secondary";
      case "critical":
        return "destructive";
      case "new":
        return "outline";
      case "complete":
        return "secondary";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: Activity["status"]): string {
    switch (status) {
      case "compliant":
        return "Compliant";
      case "critical":
        return "Critical";
      case "new":
        return "New";
      case "complete":
        return "Complete";
      default:
        return "";
    }
  }

  trackByActivityId(index: number, activity: Activity): string {
    return activity.id;
  }
}
