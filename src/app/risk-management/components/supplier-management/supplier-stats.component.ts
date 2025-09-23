import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';

export interface SupplierStat {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  variant: "default" | "success" | "danger";
}

@Component({
  selector: 'app-supplier-stats',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
  ],
  templateUrl: './supplier-stats.component.html',
  styleUrls: ['./supplier-stats.component.scss']
})
export class SupplierStatsComponent {
  stats: SupplierStat[] = [
    {
      title: "Total Suppliers",
      value: 247,
      change: "+12 this month",
      icon: "👥",
      variant: "default",
    },
    {
      title: "Active Suppliers",
      value: 231,
      change: "93.5% of total",
      icon: "✅",
      variant: "success",
    },
    {
      title: "High-Risk Suppliers",
      value: 8,
      change: "3.2% of total",
      icon: "⚠️",
      variant: "danger",
    },
    {
      title: "Compliance Rate",
      value: "94.2%",
      change: "+2.1% this quarter",
      icon: "📈",
      variant: "success",
    },
  ];

  getVariantStyles(variant: SupplierStat["variant"]): string {
    switch (variant) {
      case "success":
        return "stat-card-success";
      case "danger":
        return "stat-card-danger";
      default:
        return "";
    }
  }

  getValueColor(variant: SupplierStat["variant"]): string {
    return "stat-value";
  }

  getTitleColor(): string {
    return "stat-title";
  }

  getDescriptionColor(): string {
    return "stat-description";
  }

  getIconColor(variant: SupplierStat["variant"]): string {
    switch (variant) {
      case "success":
        return "stat-icon-success";
      case "danger":
        return "stat-icon-danger";
      default:
        return "stat-icon-default";
    }
  }

  trackByStatTitle(index: number, stat: SupplierStat): string {
    return stat.title;
  }
}
