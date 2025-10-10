import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { Findingservice } from '../../services/Findings/findingservice';
import { FindingsRefreshService } from '../../shared/findings-refresh-service';

export interface FindingStat {
  title: string;
  value: number;
  description: string;
  icon: string;
  variant: "default" | "warning" | "danger" | "success";
}

@Component({
  selector: 'app-findings-stats',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
  ],
  templateUrl: './findings-stats.component.html',
  styleUrls: ['./findings-stats.component.scss']
})
export class FindingsStatsComponent {

  constructor(private findingservice: Findingservice, private refreshService: FindingsRefreshService
){
    this.GetSummary();
     this.refreshService.refresh$.subscribe(() => {
      this.GetSummary();
    });
  }
  stats: FindingStat[] =[];

  getVariantStyles(variant: string): string {
    switch (variant) {
      case "success":
        return "stat-card-success";
      case "warning":
        return "stat-card-warning";
      case "danger":
        return "stat-card-danger";
      default:
        return "stat-card-default";
    }
  }

  getValueColor(variant: string): string {
    return "stat-value";
  }

  getTitleColor(): string {
    return "stat-title";
  }

  getDescriptionColor(): string {
    return "stat-description";
  }

  getIconColor(variant: string): string {
    switch (variant) {
      case "success":
        return "stat-icon-success";
      case "warning":
        return "stat-icon-warning";
      case "danger":
        return "stat-icon-danger";
      default:
        return "stat-icon-default";
    }
  }

  trackByStatTitle(index: number, stat: FindingStat): string {
    return stat.title;
  }
  summary: any;

  // GetSummary(){
  //   this.findingservice.GetfindingSummary().subscribe({
  //     next : (res : any) =>{
  //         summary : res;
  //     }
  //   })
  // }

  GetSummary() {
  this.findingservice.GetfindingSummary().subscribe({
    next: (res: any) => {
      this.stats = [
        {
          title: "Total Findings",
          value: res.totalFindings,
          description: "All time findings",
          icon: "📄",
          variant: "default",
        },
        {
          title: "Open Findings",
          value: res.openFindings,
          description: "Currently active",
          icon: "⚠️",
          variant: "warning",
        },
        {
          title: "Overdue Findings",
          value: res.overdueFindings,
          description: "Past due date",
          icon: "⏰",
          variant: "danger",
        },
        {
          title: "Closed Findings",
          value: res.closedFindings,
          description: "Resolved and closed",
          icon: "✅",
          variant: "success",
        },
      ];
    },
    error: (err) => {
      console.error("Error fetching summary:", err);
    }
  });
}


}
