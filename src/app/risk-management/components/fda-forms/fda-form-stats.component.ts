import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';

export interface FormStat {
  title: string;
  value: number;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-fda-form-stats',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
  ],
  templateUrl: './fda-form-stats.component.html',
  styleUrls: ['./fda-form-stats.component.scss']
})
export class FDAFormStatsComponent {
  stats: FormStat[] = [
    {
      title: "Active Templates",
      value: 12,
      icon: "📋",
      description: "Ready to use",
    },
    {
      title: "Total Submissions",
      value: 156,
      icon: "📤",
      description: "All time submissions",
    },
    {
      title: "Saved Forms",
      value: 23,
      icon: "💾",
      description: "Draft and completed",
    },
    {
      title: "Forms Available",
      value: 4,
      icon: "📄",
      description: "FDA form types",
    },
  ];

  trackByStatTitle(index: number, stat: FormStat): string {
    return stat.title;
  }
}
