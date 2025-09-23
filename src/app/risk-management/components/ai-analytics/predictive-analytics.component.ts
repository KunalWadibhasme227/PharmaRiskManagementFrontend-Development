import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';
import { ProgressComponent } from '../ui/progress.component';

export interface Prediction {
  id: number;
  title: string;
  description: string;
  current: number;
  predicted: number;
  trend: "up" | "down" | "stable";
  confidence: number;
  icon: string;
  unit: string;
}

@Component({
  selector: 'app-predictive-analytics',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardDescriptionComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ProgressComponent
  ],
  templateUrl: './predictive-analytics.component.html',
  styleUrls: ['./predictive-analytics.component.scss']
})
export class PredictiveAnalyticsComponent {
  predictions: Prediction[] = [
    {
      id: 1,
      title: "Supplier Risk Score",
      description: "Probability of supplier-related risks",
      current: 23,
      predicted: 18,
      trend: "down",
      confidence: 89,
      icon: "🎯",
      unit: "%",
    },
    {
      id: 2,
      title: "Compliance Rate",
      description: "Current vs. predicted compliance percentage",
      current: 94,
      predicted: 97,
      trend: "up",
      confidence: 92,
      icon: "🛡️",
      unit: "%",
    },
    {
      id: 3,
      title: "Audit Efficiency",
      description: "Improvement projections in audit effectiveness",
      current: 78,
      predicted: 85,
      trend: "up",
      confidence: 86,
      icon: "📊",
      unit: "%",
    },
    {
      id: 4,
      title: "Cost per Audit",
      description: "Current audit cost vs. optimized predicted cost",
      current: 12500,
      predicted: 9800,
      trend: "down",
      confidence: 91,
      icon: "💰",
      unit: "$",
    },
  ];

  getTrendIcon(trend: Prediction["trend"]): string {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      case "stable":
        return "➖";
      default:
        return "➖";
    }
  }

  getTrendColor(trend: Prediction["trend"]): string {
    switch (trend) {
      case "up":
        return "trend-up";
      case "down":
        return "trend-down";
      case "stable":
        return "trend-stable";
      default:
        return "trend-stable";
    }
  }

  getFormattedValue(value: number, unit: string): string {
    if (unit === "$") {
      return `$${value.toLocaleString()}`;
    }
    return `${value.toLocaleString()}${unit}`;
  }

  trackByPredictionId(index: number, prediction: Prediction): number {
    return prediction.id;
  }
}
