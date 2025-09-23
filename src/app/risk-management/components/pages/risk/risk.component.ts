import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { RiskAlertsComponent } from '../../risk/risk-alerts.component';

export interface KeyMetric {
  title: string;
  value: number;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-risk',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    RiskAlertsComponent
  ],
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss']
})
export class RiskComponent implements OnInit {
  keyMetrics: KeyMetric[] = [
    {
      title: "Total Risks Identified",
      value: 23,
      description: "Active risks across suppliers",
      icon: "⚠️",
    },
    {
      title: "High-Risk Suppliers",
      value: 5,
      description: "Require immediate attention",
      icon: "👥",
    },
    {
      title: "Open Audits",
      value: 8,
      description: "Risk-related audits in progress",
      icon: "📅",
    },
    {
      title: "Mitigation Actions Pending",
      value: 12,
      description: "Awaiting execution",
      icon: "🔧",
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  trackByMetricTitle(index: number, metric: KeyMetric): string {
    return metric.title;
  }
}
