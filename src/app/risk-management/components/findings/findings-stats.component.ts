import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';

export interface FindingStat {
  title: string;
  value: number;
  description: string;
  icon: string;
  variant: "default" | "warning" | "danger" | "success";
}

@Component({
  selector: 'app-findings-stats',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
  ],
  templateUrl: './findings-stats.component.html',
  styleUrls: ['./findings-stats.component.scss']
})
export class FindingsStatsComponent {
  stats: FindingStat[] = [
    {
      title: "Total Findings",
      value: 45,
      description: "All time findings",
      icon: "📄",
      variant: "default",
    },
    {
      title: "Open Findings",
      value: 12,
      description: "Currently active",
      icon: "⚠️",
      variant: "warning",
    },
    {
      title: "Overdue Findings",
      value: 3,
      description: "Past due date",
      icon: "⏰",
      variant: "danger",
    },
    {
      title: "Closed Findings",
      value: 30,
      description: "Resolved and closed",
      icon: "✅",
      variant: "success",
    },
  ];

  getVariantStyles(variant: string): string {
    switch (variant) {
      case "success":
        return "stat-card-success";
      case "warning":
        return "stat-card-warning";
      case "danger":
        return "stat-card-danger";
      default:
        return "stat-card-default";
    }
  }

  getValueColor(variant: string): string {
    return "stat-value";
  }

  getTitleColor(): string {
    return "stat-title";
  }

  getDescriptionColor(): string {
    return "stat-description";
  }

  getIconColor(variant: string): string {
    switch (variant) {
      case "success":
        return "stat-icon-success";
      case "warning":
        return "stat-icon-warning";
      case "danger":
        return "stat-icon-danger";
      default:
        return "stat-icon-default";
    }
  }

  trackByStatTitle(index: number, stat: FindingStat): string {
    return stat.title;
  }
}
