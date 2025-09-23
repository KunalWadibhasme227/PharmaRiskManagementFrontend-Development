import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { FDAFormStatsComponent } from '../../fda-forms/fda-form-stats.component';
import { CreateFormSectionComponent } from '../../fda-forms/create-form-section.component';
import { SavedFormsListComponent } from '../../fda-forms/saved-forms-list.component';
import { FormTemplatesComponent } from '../../fda-forms/form-templates.component';
@Component({
  selector: 'app-fda-forms',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    FDAFormStatsComponent,
    CreateFormSectionComponent,
    SavedFormsListComponent,
    FormTemplatesComponent
  ],
  templateUrl: './fda-forms.component.html',
  styleUrls: ['./fda-forms.component.scss']
})
export class FDAFormsComponent implements OnInit {
  activeTab = 'create';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tabValue: string): void {
    this.activeTab = tabValue;
  }
}
