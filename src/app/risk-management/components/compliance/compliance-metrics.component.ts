import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';

export interface ComplianceMetric {
  standard: string;
  score: number;
  status: "compliant" | "warning" | "non-compliant";
  lastReview: string;
  nextReview: string;
}

@Component({
  selector: 'app-compliance-metrics',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent
  ],
  templateUrl: './compliance-metrics.component.html',
  styleUrls: ['./compliance-metrics.component.scss']
})
export class ComplianceMetricsComponent {
  metrics: ComplianceMetric[] = [
    {
      standard: "GMP (Good Manufacturing Practice)",
      score: 96,
      status: "compliant",
      lastReview: "2024-11-15",
      nextReview: "2025-05-15",
    },
    {
      standard: "FDA Regulations",
      score: 89,
      status: "compliant",
      lastReview: "2024-10-20",
      nextReview: "2025-04-20",
    },
    {
      standard: "ISO 9001:2015",
      score: 78,
      status: "warning",
      lastReview: "2024-09-10",
      nextReview: "2025-03-10",
    },
    {
      standard: "ICH Guidelines",
      score: 94,
      status: "compliant",
      lastReview: "2024-12-01",
      nextReview: "2025-06-01",
    },
  ];

  getStatusBadgeVariant(status: ComplianceMetric["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "compliant":
        return "primary";
      case "warning":
        return "accent";
      case "non-compliant":
        return "destructive";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: ComplianceMetric["status"]): string {
    switch (status) {
      case "compliant":
        return "Compliant";
      case "warning":
        return "Warning";
      case "non-compliant":
        return "Non-Compliant";
      default:
        return "";
    }
  }

  getProgressColor(score: number): string {
    if (score >= 90) return "progress-high";
    if (score >= 75) return "progress-medium";
    return "progress-low";
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  trackByStandard(index: number, metric: ComplianceMetric): string {
    return metric.standard;
  }
}
