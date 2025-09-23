import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { BadgeComponent } from '../../ui/badge.component';
import { ButtonComponent } from '../../ui/button.component';
import { InputComponent } from '../../ui/input.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';

export interface Material {
  id: number;
  name: string;
  batch: string;
  supplier: string;
  status: "In Storage" | "In Transit" | "Quality Check";
  temperature: string;
  quantity: string;
  expiry: string;
  location: string;
}

export interface StorageCondition {
  zone: string;
  temperature: string;
  humidity: string;
  status: "Normal" | "Alert";
}

@Component({
  selector: 'app-materials',
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
    InputComponent
  ],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {
  activeTab = 'inventory';

  materials: Material[] = [
    {
      id: 1,
      name: "Active Pharmaceutical Ingredient A",
      batch: "API-2024-001",
      supplier: "ChemCorp Ltd",
      status: "In Storage",
      temperature: "2-8°C",
      quantity: "500kg",
      expiry: "2024-12-15",
      location: "Warehouse A-1",
    },
    {
      id: 2,
      name: "Excipient Lactose Monohydrate",
      batch: "EXC-2024-045",
      supplier: "BioSupply Inc",
      status: "In Transit",
      temperature: "Room Temp",
      quantity: "1000kg",
      expiry: "2025-06-30",
      location: "In Transit",
    },
    {
      id: 3,
      name: "Packaging Material - Bottles",
      batch: "PKG-2024-012",
      supplier: "PackTech Solutions",
      status: "Quality Check",
      temperature: "Room Temp",
      quantity: "10,000 units",
      expiry: "N/A",
      location: "QC Lab",
    },
  ];

  storageConditions: StorageCondition[] = [
    { zone: "Cold Storage A", temperature: "2-8°C", humidity: "45%", status: "Normal" },
    { zone: "Cold Storage B", temperature: "2-8°C", humidity: "48%", status: "Normal" },
    { zone: "Controlled Room Temp", temperature: "20-25°C", humidity: "40%", status: "Alert" },
    { zone: "Dry Storage", temperature: "15-30°C", humidity: "35%", status: "Normal" },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onAddMaterial(): void {
    console.log('Adding new material');
    // Handle add material logic here
  }

  onViewDetails(material: Material): void {
    console.log('Viewing details for material:', material.name);
    // Handle view details logic here
  }

  onTrackBatch(material: Material): void {
    console.log('Tracking batch for material:', material.name);
    // Handle track batch logic here
  }

  onInitializeTracking(): void {
    console.log('Initializing batch tracking');
    // Handle initialize tracking logic here
  }

  getStatusBadgeVariant(status: Material["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "In Storage":
        return "default";
      case "In Transit":
        return "secondary";
      case "Quality Check":
        return "outline";
      default:
        return "default";
    }
  }

  getStorageStatusBadgeVariant(status: StorageCondition["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "Normal":
        return "default";
      case "Alert":
        return "secondary";
      default:
        return "default";
    }
  }

  trackByMaterialId(index: number, material: Material): number {
    return material.id;
  }

  trackByStorageZone(index: number, condition: StorageCondition): string {
    return condition.zone;
  }
}
