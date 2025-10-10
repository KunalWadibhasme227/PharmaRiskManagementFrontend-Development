import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';
import { TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent } from '../ui/tabs.component';
import { Findingservice } from '../../services/Findings/findingservice';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Addfindings } from './addfindings/addfindings';
import { MatDialog } from '@angular/material/dialog';
import { FindingsStatsComponent } from './findings-stats.component';
import { FindingsRefreshService } from '../../shared/findings-refresh-service';

@Component({
  selector: 'app-findings-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    ButtonComponent,
    BadgeComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent
  ],
  templateUrl: './findings-list.component.html',
  styleUrls: ['./findings-list.component.scss']
})


export class FindingsListComponent {
  activeTab = 'open';
    @ViewChild(FindingsStatsComponent) findingsStats!: FindingsStatsComponent;


  assignees: any[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 1, name: 'Jonny Smith' },
    { id: 2, name: 'Jems Joe' }
  ];

  constructor(private findingservice: Findingservice, private router: Router, private notify: NotificationService
    , private dialog: MatDialog, private refreshService: FindingsRefreshService) {
    this.getFindingList(this.activeTab);
  }
  filteredFindings: any[] = []

  getCategoryBadgeVariant(category: any): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (category) {
      case 1:
        return "destructive";
      case 2:
        return "accent";
      case 3:
        return "primary";
      default:
        return "default";
    }
  }

  getCategoryBadgeText(category: any): string {
    switch (category) {
      case 1:
        return "Critical";
      case 2:
        return "Major";
      case 3:
        return "Minor";
      default:
        return "";
    }
  }

  getStatusBadgeVariant(status: any): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case 1:
        return "outline";
      case 2:
        return "destructive";
      case 3:
        return "primary";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: any): string {
    switch (status) {
      case 1:
        return "Open";
      case 2:
        return "Overdue";
      case 3:
        return "Closed";
      default:
        return "";
    }
  }

  getAssigneeName(id: number): string {
    const assignee = this.assignees.find(a => a.id === id);
    return assignee ? assignee.name : 'Unknown';
  }
  onTabChange(tabValue: string): void {
    this.getFindingList(tabValue);
    this.activeTab = tabValue;
  }
  getFindingList(value: any) {
    console.log("Active tab : ", value);
    this.findingservice.getfindings(value).subscribe({
      next: (response: any) => {
        this.filteredFindings = response;
        console.log("filteredFinding : ", this.filteredFindings)
      },
      error: (err: any) => {
        console.error('Error adding finding', err);
        // Optionally show an error message to the user
      }
    });
  }

  onViewDetails(findingId: string): void {
    this.router.navigate(['/findings/view', findingId]);
  }


  UpdateProgressDialog(finding: string): void {
    const ref = this.dialog.open(Addfindings, {
      width: '800px',
      data: { id: finding }
    });

    ref.afterClosed().subscribe(() => {
      this.getFindingList(this.activeTab);
    });
  }

  onMarkComplete(finding: any): void {
    finding.progressPercent = 100;
    finding.statusId = 3;
    this.findingservice.markfindingcomplete(finding).subscribe({
      next: (response: any) => {
        this.getFindingList(this.activeTab);
        this.findingsStats.GetSummary();
        this.refreshService.triggerRefresh();
        this.notify.Success("Progress Updated Successfully");
      }
    })
    console.log('Marking complete:', finding.name);
    // Handle mark complete logic here
  }

  onDeleteFinding(findingId: string) {
    this.findingservice.deletefinding(findingId).subscribe({
      next: (response: any) => {
        this.getFindingList(this.activeTab);
        this.findingsStats.GetSummary();
        this.refreshService.triggerRefresh();
        this.notify.Success("Finding Deleted Successfully");
      }
    });
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  trackByFindingId(index: number, finding: any): string {
    return finding.id;
  }
}
