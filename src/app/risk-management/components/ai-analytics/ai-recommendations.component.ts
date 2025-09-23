import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';
import { ButtonComponent } from '../ui/button.component';

export interface AIRecommendation {
  id: number;
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  savings: string;
  timeframe: string;
  icon: string;
  status: "recommended" | "in-progress" | "completed";
}

@Component({
  selector: 'app-ai-recommendations',
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
  templateUrl: './ai-recommendations.component.html',
  styleUrls: ['./ai-recommendations.component.scss']
})
export class AIRecommendationsComponent {
  recommendations: AIRecommendation[] = [
    {
      id: 1,
      title: "Optimize Audit Frequency",
      description: "Adjusts audit schedules using supplier performance data to cut unnecessary audits and save costs",
      impact: "High",
      savings: "$45,000/year",
      timeframe: "2-3 weeks",
      icon: "📅",
      status: "recommended",
    },
    {
      id: 2,
      title: "Enhance Risk Scoring",
      description: "Improves supplier risk models by adding financial and stability factors for more accurate predictions",
      impact: "Medium",
      savings: "15% accuracy improvement",
      timeframe: "4-6 weeks",
      icon: "🎯",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Automate Documentation",
      description: "Automates collection and updating of supplier documents to reduce manual workload and errors",
      impact: "High",
      savings: "60 hours/month",
      timeframe: "3-4 weeks",
      icon: "📄",
      status: "recommended",
    },
    {
      id: 4,
      title: "Predictive Maintenance",
      description: "Uses operational data to anticipate equipment issues, preventing quality or compliance disruptions",
      impact: "Medium",
      savings: "25% downtime reduction",
      timeframe: "6-8 weeks",
      icon: "🔧",
      status: "completed",
    },
  ];

  getStatusBadgeVariant(status: AIRecommendation["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      case "recommended":
        return "outline";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: AIRecommendation["status"]): string {
    switch (status) {
      case "completed":
        return "COMPLETED";
      case "in-progress":
        return "IN PROGRESS";
      case "recommended":
        return "RECOMMENDED";
      default:
        return "";
    }
  }

  getStatusIcon(status: AIRecommendation["status"]): string {
    switch (status) {
      case "completed":
        return "✅";
      case "in-progress":
        return "⏰";
      case "recommended":
        return "";
      default:
        return "";
    }
  }

  getStatusBadgeClass(status: AIRecommendation["status"]): string {
    switch (status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-in-progress";
      case "recommended":
        return "status-recommended";
      default:
        return "";
    }
  }

  onImplementRecommendation(recommendation: AIRecommendation): void {
    console.log('Implementing recommendation:', recommendation.title);
    // Handle implement recommendation logic here
  }

  trackByRecommendationId(index: number, recommendation: AIRecommendation): number {
    return recommendation.id;
  }
}
