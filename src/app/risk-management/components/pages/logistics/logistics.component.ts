import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';
import { BadgeComponent } from '../../ui/badge.component';
import { ButtonComponent } from '../../ui/button.component';
import { InputComponent } from '../../ui/input.component';
export interface Shipment {
  id: string;
  supplier: string;
  origin: string;
  destination: string;
  status: "In Transit" | "Delivered" | "Delayed";
  temperature: string;
  humidity: string;
  estimatedArrival: string;
  carrier: string;
}

export interface LogisticsMetric {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  variant: "default" | "success" | "danger";
}

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    CardComponent,
    CardContentComponent,
    CardDescriptionComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit {
  activeTab = 'shipments';

  metrics: LogisticsMetric[] = [
    {
      title: "Total Shipments",
      value: 156,
      change: "This month",
      icon: "📦",
      variant: "default",
    },
    {
      title: "On-Time Delivery",
      value: "94.2%",
      change: "+2.1% from last month",
      icon: "⏰",
      variant: "success",
    },
    {
      title: "Avg Transit Time",
      value: "3.2 days",
      change: "-0.3 days improvement",
      icon: "🚚",
      variant: "success",
    },
    {
      title: "Temperature Compliance",
      value: "98.7%",
      change: "Within spec range",
      icon: "🌡️",
      variant: "success",
    },
    {
      title: "Cost per Shipment",
      value: "$1250",
      change: "-5% cost reduction",
      icon: "💰",
      variant: "success",
    },
    {
      title: "Carbon Footprint",
      value: "2.4 kg CO₂",
      change: "Per shipment avg",
      icon: "🌱",
      variant: "default",
    },
  ];

  shipments: Shipment[] = [
    {
      id: "SH-2024-001",
      supplier: "PharmaCorp Ltd",
      origin: "Mumbai, India",
      destination: "New York, USA",
      status: "In Transit",
      temperature: "2-8°C",
      humidity: "45%",
      estimatedArrival: "2024-01-20",
      carrier: "ColdChain Express",
    },
    {
      id: "SH-2024-002",
      supplier: "BioSupply Inc",
      origin: "Berlin, Germany",
      destination: "Boston, USA",
      status: "Delivered",
      temperature: "15-25°C",
      humidity: "40%",
      estimatedArrival: "2024-01-15",
      carrier: "Global Logistics",
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onTrackNewShipment(): void {
    console.log('Tracking new shipment');
    // Handle track new shipment logic here
  }

  onTrackShipment(shipment: Shipment): void {
    console.log('Tracking shipment:', shipment.id);
    // Handle track shipment logic here
  }

  onViewDetails(shipment: Shipment): void {
    console.log('Viewing details for shipment:', shipment.id);
    // Handle view details logic here
  }

  onGenerateReport(): void {
    console.log('Generating carrier performance report');
    // Handle generate report logic here
  }

  getStatusBadgeVariant(status: Shipment["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "Delivered":
        return "default";
      case "In Transit":
        return "secondary";
      case "Delayed":
        return "destructive";
      default:
        return "default";
    }
  }

  trackByShipmentId(index: number, shipment: Shipment): string {
    return shipment.id;
  }

  getVariantStyles(variant: LogisticsMetric["variant"]): string {
    switch (variant) {
      case "success":
        return "metric-card-success";
      case "danger":
        return "metric-card-danger";
      default:
        return "";
    }
  }

  getValueColor(variant: LogisticsMetric["variant"]): string {
    return "metric-value";
  }

  getTitleColor(): string {
    return "metric-title";
  }

  getDescriptionColor(): string {
    return "metric-description";
  }

  getIconColor(variant: LogisticsMetric["variant"]): string {
    switch (variant) {
      case "success":
        return "metric-icon-success";
      case "danger":
        return "metric-icon-danger";
      default:
        return "metric-icon-default";
    }
  }

  trackByMetricTitle(index: number, metric: LogisticsMetric): string {
    return metric.title;
  }
}
