import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';

export interface MetricChange {
  value: string;
  type: "positive" | "negative" | "neutral";
}

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
  ],
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss']
})
export class MetricCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() change?: MetricChange;
  @Input() description?: string;
  @Input() icon: any; // We'll use any for the icon component
  @Input() variant: "default" | "warning" | "danger" | "success" = "default";

  getVariantStyles(): string {
    switch (this.variant) {
      case "warning":
        return "metric-card-warning";
      case "danger":
        return "metric-card-danger";
      case "success":
        return "metric-card-success";
      default:
        return "";
    }
  }

  getValueColor(): string {
    return "metric-value";
  }

  getTitleColor(): string {
    return "metric-title";
  }

  getDescriptionColor(): string {
    return "metric-description";
  }

  getChangeColor(): string {
    if (!this.change) return "";
    switch (this.change.type) {
      case "positive":
        return "metric-change-positive";
      case "negative":
        return "metric-change-negative";
      default:
        return "metric-change-neutral";
    }
  }

  getIconColor(): string {
    switch (this.variant) {
      case "warning":
        return "metric-icon-warning";
      case "danger":
        return "metric-icon-danger";
      case "success":
        return "metric-icon-success";
      default:
        return "metric-icon-default";
    }
  }
}
