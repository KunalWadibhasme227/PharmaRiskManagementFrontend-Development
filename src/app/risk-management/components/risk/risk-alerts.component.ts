import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';
import { ButtonComponent } from '../ui/button.component';

export interface RiskAlert {
  id: string;
  type: string;
  description: string;
  severity: "high" | "medium" | "low";
  supplier?: string;
  daysOverdue?: number;
}

@Component({
  selector: 'app-risk-alerts',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent
  ],
  templateUrl: './risk-alerts.component.html',
  styleUrls: ['./risk-alerts.component.scss']
})
export class RiskAlertsComponent {
  riskAlerts: RiskAlert[] = [
    {
      id: "1",
      type: "Equipment Calibration Overdue",
      description: "Critical measurement equipment requires immediate calibration",
      severity: "high",
      supplier: "PharmaCorp Ltd",
      daysOverdue: 5,
    },
    {
      id: "2",
      type: "Delivery Delay Risk",
      description: "Shipment delayed due to weather conditions, may impact production",
      severity: "medium",
      supplier: "MedSupply Inc",
    },
    {
      id: "3",
      type: "Certification Renewal Due",
      description: "ISO 9001 certificate expires in 30 days",
      severity: "high",
      supplier: "BioTech Solutions",
    },
  ];

  getSeverityBadgeVariant(severity: RiskAlert["severity"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "accent";
      case "low":
        return "primary";
      default:
        return "default";
    }
  }

  getSeverityBadgeText(severity: RiskAlert["severity"]): string {
    switch (severity) {
      case "high":
        return "High Risk";
      case "medium":
        return "Medium Risk";
      case "low":
        return "Low Risk";
      default:
        return "";
    }
  }

  getAlertIcon(type: string): string {
    if (type.includes("Calibration")) return "⏰";
    if (type.includes("Certification")) return "🏆";
    return "⚠️";
  }

  onTakeAction(alert: RiskAlert): void {
    console.log('Taking action for alert:', alert.type);
    // Handle take action logic here
  }

  trackByAlertId(index: number, alert: RiskAlert): string {
    return alert.id;
  }
}
