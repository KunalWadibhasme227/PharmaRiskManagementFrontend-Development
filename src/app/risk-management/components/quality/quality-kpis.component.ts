import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';

export interface KPI {
  name: string;
  current: number;
  target: number;
  unit: string;
  status: "above-target" | "on-target" | "below-target";
}

@Component({
  selector: 'app-quality-kpis',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent
  ],
  templateUrl: './quality-kpis.component.html',
  styleUrls: ['./quality-kpis.component.scss']
})
export class QualityKPIsComponent {
  kpis: KPI[] = [
    {
      name: "System Uptime",
      current: 99.2,
      target: 99.0,
      unit: "%",
      status: "above-target",
    },
    {
      name: "Document Accuracy",
      current: 96.8,
      target: 98.0,
      unit: "%",
      status: "below-target",
    },
    {
      name: "Training Completion",
      current: 94.5,
      target: 95.0,
      unit: "%",
      status: "below-target",
    },
    {
      name: "CAPA Closure Rate",
      current: 87.3,
      target: 85.0,
      unit: "%",
      status: "above-target",
    },
  ];

  getStatusBadgeVariant(status: KPI["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "above-target":
        return "primary";
      case "on-target":
        return "secondary";
      case "below-target":
        return "destructive";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: KPI["status"]): string {
    switch (status) {
      case "above-target":
        return "Above Target";
      case "on-target":
        return "On Target";
      case "below-target":
        return "Below Target";
      default:
        return "";
    }
  }

  getProgressColor(status: KPI["status"]): string {
    switch (status) {
      case "above-target":
        return "progress-primary";
      case "on-target":
        return "progress-secondary";
      case "below-target":
        return "progress-destructive";
      default:
        return "progress-default";
    }
  }

  getProgressValue(kpi: KPI): number {
    return (kpi.current / kpi.target) * 100;
  }

  trackByKpiName(index: number, kpi: KPI): string {
    return kpi.name;
  }
}
