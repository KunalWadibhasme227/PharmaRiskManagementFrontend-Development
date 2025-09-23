import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';
import { BadgeComponent } from '../../ui/badge.component';
import { ButtonComponent } from '../../ui/button.component';
import { ProgressComponent } from '../../ui/progress.component';
export interface Facility {
  id: number;
  name: string;
  location: string;
  status: "Operational" | "Maintenance";
  temperature: string;
  humidity: string;
  airQuality: string;
  lastInspection: string;
  nextInspection: string;
}

export interface Equipment {
  name: string;
  status: "Operational" | "Alert";
  efficiency: number;
  lastMaintenance: string;
}

@Component({
  selector: 'app-facilities',
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
    ProgressComponent
  ],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {
  activeTab = 'facilities';

  facilities: Facility[] = [
    {
      id: 1,
      name: "Manufacturing Plant A",
      location: "New Jersey, USA",
      status: "Operational",
      temperature: "22°C",
      humidity: "45%",
      airQuality: "Good",
      lastInspection: "2024-01-10",
      nextInspection: "2024-04-10",
    },
    {
      id: 2,
      name: "Quality Control Lab",
      location: "California, USA",
      status: "Maintenance",
      temperature: "20°C",
      humidity: "40%",
      airQuality: "Excellent",
      lastInspection: "2024-01-05",
      nextInspection: "2024-04-05",
    },
    {
      id: 3,
      name: "Warehouse Facility",
      location: "Texas, USA",
      status: "Operational",
      temperature: "18°C",
      humidity: "35%",
      airQuality: "Good",
      lastInspection: "2023-12-20",
      nextInspection: "2024-03-20",
    },
  ];

  equipment: Equipment[] = [
    { name: "HVAC System A", status: "Operational", efficiency: 95, lastMaintenance: "2024-01-08" },
    { name: "Cleanroom Equipment", status: "Operational", efficiency: 98, lastMaintenance: "2024-01-12" },
    { name: "Temperature Control Unit", status: "Alert", efficiency: 78, lastMaintenance: "2023-12-15" },
    { name: "Air Filtration System", status: "Operational", efficiency: 92, lastMaintenance: "2024-01-05" },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onAddFacility(): void {
    console.log('Adding new facility');
    // Handle add facility logic here
  }

  onViewDetails(facility: Facility): void {
    console.log('Viewing details for:', facility.name);
    // Handle view details logic here
  }

  onScheduleInspection(facility: Facility): void {
    console.log('Scheduling inspection for:', facility.name);
    // Handle schedule inspection logic here
  }

  onScheduleMaintenance(): void {
    console.log('Scheduling maintenance');
    // Handle schedule maintenance logic here
  }

  getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "Operational":
        return "default";
      case "Maintenance":
        return "secondary";
      case "Alert":
        return "destructive";
      default:
        return "default";
    }
  }

  getEquipmentStatusIcon(status: string): string {
    return status === "Operational" ? "⚡" : "⚠️";
  }

  getEquipmentStatusText(status: string): string {
    return status === "Operational" ? "Running normally" : "Requires attention";
  }

  trackByFacilityId(index: number, facility: Facility): number {
    return facility.id;
  }

  trackByEquipmentName(index: number, equipment: Equipment): string {
    return equipment.name;
  }
}
