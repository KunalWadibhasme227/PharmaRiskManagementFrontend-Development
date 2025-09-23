import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';

export interface OverviewData {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  variant: "success" | "warning" | "default";
  trend: string;
}

@Component({
  selector: 'app-compliance-overview-cards',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
  ],
  templateUrl: './compliance-overview-cards.component.html',
  styleUrls: ['./compliance-overview-cards.component.scss']
})
export class ComplianceOverviewCardsComponent {
  overviewData: OverviewData[] = [
    {
      title: "Overall Score",
      value: "92%",
      description: "Average compliance score",
      icon: "🏆",
      variant: "success",
      trend: "+3% from last quarter",
    },
    {
      title: "Active Certifications",
      value: 3,
      description: "Currently valid certifications",
      icon: "🛡️",
      variant: "default",
      trend: "ISO 9001, GMP, FDA",
    },
    {
      title: "Renewals Due",
      value: 1,
      description: "Within next 90 days",
      icon: "⚠️",
      variant: "warning",
      trend: "ISO 9001 expires Mar 2025",
    },
    {
      title: "Recent Audits",
      value: 5,
      description: "Completed this quarter",
      icon: "📅",
      variant: "default",
      trend: "4 passed, 1 conditional",
    },
  ];

  getVariantStyles(variant: string): string {
    switch (variant) {
      case "success":
        return "overview-card-success";
      case "warning":
        return "overview-card-warning";
      default:
        return "overview-card-default";
    }
  }

  getValueColor(variant: string): string {
    return "overview-value";
  }

  trackByTitle(index: number, item: OverviewData): string {
    return item.title;
  }
}
