import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { UpcomingAuditsListComponent } from '../../audit-schedule/upcoming-audits-list.component';
import { CompletedAuditsListComponent } from '../../audit-schedule/completed-audits-list.component';
import { AuditCalendarComponent } from '../../audit-schedule/audit-calendar.component';

@Component({
  selector: 'app-audits',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    UpcomingAuditsListComponent,
    CompletedAuditsListComponent,
    AuditCalendarComponent
  ],
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit {
  activeTab = 'upcoming';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tabValue: string): void {
    this.activeTab = tabValue;
  }
}
