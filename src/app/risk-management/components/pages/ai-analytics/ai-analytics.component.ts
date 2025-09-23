import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { AIInsightsComponent } from '../../ai-analytics/ai-insights.component';
import { PredictiveAnalyticsComponent } from '../../ai-analytics/predictive-analytics.component';
import { AIRecommendationsComponent } from '../../ai-analytics/ai-recommendations.component';
@Component({
  selector: 'app-ai-analytics',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    AIInsightsComponent,
    PredictiveAnalyticsComponent,
    AIRecommendationsComponent
  ],
  templateUrl: './ai-analytics.component.html',
  styleUrls: ['./ai-analytics.component.scss']
})
export class AIAnalyticsComponent implements OnInit {
  activeTab = 'insights';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }
}
