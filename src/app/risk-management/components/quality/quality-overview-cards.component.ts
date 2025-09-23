import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';

export interface QualityOverviewData {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  variant: "success" | "warning" | "default";
}

@Component({
  selector: 'app-quality-overview-cards',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
  ],
  templateUrl: './quality-overview-cards.component.html',
  styleUrls: ['./quality-overview-cards.component.scss']
})
export class QualityOverviewCardsComponent {
  overviewData: QualityOverviewData[] = [
    {
      title: "Systems Monitored",
      value: 12,
      description: "Active quality systems",
      icon: "⚙️",
      variant: "default",
    },
    {
      title: "Average Compliance",
      value: "94.2%",
      description: "Across all systems",
      icon: "📈",
      variant: "success",
    },
    {
      title: "Open Findings",
      value: 8,
      description: "Require attention",
      icon: "⚠️",
      variant: "warning",
    },
    {
      title: "Compliant Systems",
      value: 10,
      description: "Out of 12 systems",
      icon: "✅",
      variant: "success",
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

  trackByTitle(index: number, item: QualityOverviewData): string {
    return item.title;
  }
}
