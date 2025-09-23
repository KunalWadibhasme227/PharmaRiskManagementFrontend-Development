import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';
import { ButtonComponent } from '../ui/button.component';

export interface AIInsight {
  id: number;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  confidence: number;
  action: string;
  supplier: string;
  icon: string;
}

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardDescriptionComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent
  ],
  templateUrl: './ai-insights.component.html',
  styleUrls: ['./ai-insights.component.scss']
})
export class AIInsightsComponent {
  insights: AIInsight[] = [
    {
      id: 1,
      title: "High Risk Supplier Detected",
      description: "Acme Pharmaceuticals shows declining compliance scores and missed 2 recent audits",
      severity: "high",
      confidence: 94,
      action: "Schedule Immediate Audit",
      supplier: "Acme Pharmaceuticals",
      icon: "⚠️",
    },
    {
      id: 2,
      title: "Quality Metrics Below Threshold",
      description: "Manufacturing quality scores dropped 15% across 3 suppliers in the last month",
      severity: "medium",
      confidence: 87,
      action: "Implement Training Program",
      supplier: "Multiple Suppliers",
      icon: "📈",
    },
    {
      id: 3,
      title: "Audit Schedule Optimization",
      description: "Current audit schedule can be optimized to reduce costs by 23% while maintaining compliance",
      severity: "low",
      confidence: 91,
      action: "Review Suggested Schedule",
      supplier: "All Suppliers",
      icon: "📅",
    },
  ];

  getSeverityBadgeVariant(severity: AIInsight["severity"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "default";
    }
  }

  getSeverityBadgeText(severity: AIInsight["severity"]): string {
    return severity.toUpperCase();
  }

  getSeverityIconClass(severity: AIInsight["severity"]): string {
    switch (severity) {
      case "high":
        return "severity-high";
      case "medium":
        return "severity-medium";
      case "low":
        return "severity-low";
      default:
        return "";
    }
  }

  onTakeAction(insight: AIInsight): void {
    console.log('Taking action for insight:', insight.title);
    // Handle take action logic here
  }

  trackByInsightId(index: number, insight: AIInsight): number {
    return insight.id;
  }
}
