import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';

export interface SupplierLocation {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  type: string;
  compliance: "compliant" | "warning" | "non-compliant";
  supplierCount: number;
}

@Component({
  selector: 'app-supplier-map',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent
  ],
  templateUrl: './supplier-map.component.html',
  styleUrls: ['./supplier-map.component.scss']
})
export class SupplierMapComponent {
  supplierLocations: SupplierLocation[] = [
    {
      id: "1",
      name: "East Coast Hub",
      location: "Boston, MA",
      coordinates: { lat: 42.3601, lng: -71.0589 },
      type: "Manufacturing Hub",
      compliance: "compliant",
      supplierCount: 45,
    },
    {
      id: "2",
      name: "Midwest Operations",
      location: "Chicago, IL",
      coordinates: { lat: 41.8781, lng: -87.6298 },
      type: "Distribution Center",
      compliance: "warning",
      supplierCount: 32,
    },
    {
      id: "3",
      name: "West Coast Facility",
      location: "San Diego, CA",
      coordinates: { lat: 32.7157, lng: -117.1611 },
      type: "R&D Center",
      compliance: "compliant",
      supplierCount: 28,
    },
    {
      id: "4",
      name: "Texas Operations",
      location: "Houston, TX",
      coordinates: { lat: 29.7604, lng: -95.3698 },
      type: "Raw Materials Hub",
      compliance: "compliant",
      supplierCount: 38,
    },
    {
      id: "5",
      name: "Southeast Region",
      location: "Atlanta, GA",
      coordinates: { lat: 33.749, lng: -84.388 },
      type: "Packaging Center",
      compliance: "non-compliant",
      supplierCount: 15,
    },
  ];

  getComplianceColor(compliance: SupplierLocation["compliance"]): string {
    switch (compliance) {
      case "compliant":
        return "text-primary";
      case "warning":
        return "text-accent";
      case "non-compliant":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  }

  getComplianceBadgeVariant(compliance: SupplierLocation["compliance"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (compliance) {
      case "compliant":
        return "primary";
      case "warning":
        return "accent";
      case "non-compliant":
        return "destructive";
      default:
        return "default";
    }
  }

  getComplianceBadgeText(compliance: SupplierLocation["compliance"]): string {
    switch (compliance) {
      case "compliant":
        return "Compliant";
      case "warning":
        return "Warning";
      case "non-compliant":
        return "Non-Compliant";
      default:
        return "";
    }
  }

  trackByLocationId(index: number, location: SupplierLocation): string {
    return location.id;
  }
}
