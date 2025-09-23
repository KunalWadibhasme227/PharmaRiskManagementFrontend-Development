import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { SupplierListComponent } from '../../supplier-management/supplier-list.component';
import { SupplierStatsComponent } from '../../supplier-management/supplier-stats.component';
import { SupplierMapComponent } from '../../supplier-management/supplier-map.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    SupplierListComponent,
    SupplierMapComponent,
    SupplierStatsComponent
  ],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  activeTab = 'list';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tabValue: string): void {
    this.activeTab = tabValue;
  }
}
