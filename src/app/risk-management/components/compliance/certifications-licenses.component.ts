import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';
import { ButtonComponent } from '../ui/button.component';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expiring-soon" | "expired";
  daysUntilExpiry: number;
}

@Component({
  selector: 'app-certifications-licenses',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent
  ],
  templateUrl: './certifications-licenses.component.html',
  styleUrls: ['./certifications-licenses.component.scss']
})
export class CertificationsLicensesComponent {
  certifications: Certification[] = [
    {
      id: "1",
      name: "ISO 9001:2015 Quality Management",
      issuer: "ISO International",
      issueDate: "2022-03-15",
      expiryDate: "2025-03-15",
      status: "expiring-soon",
      daysUntilExpiry: 45,
    },
    {
      id: "2",
      name: "GMP Certificate",
      issuer: "FDA",
      issueDate: "2023-06-20",
      expiryDate: "2026-06-20",
      status: "active",
      daysUntilExpiry: 520,
    },
    {
      id: "3",
      name: "FDA Drug Establishment Registration",
      issuer: "U.S. FDA",
      issueDate: "2024-01-10",
      expiryDate: "2024-12-31",
      status: "expired",
      daysUntilExpiry: -10,
    },
  ];

  getStatusBadgeVariant(status: Certification["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "active":
        return "primary";
      case "expiring-soon":
        return "accent";
      case "expired":
        return "destructive";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: Certification["status"]): string {
    switch (status) {
      case "active":
        return "Active";
      case "expiring-soon":
        return "Expiring Soon";
      case "expired":
        return "Expired";
      default:
        return "";
    }
  }

  getExpiryAlertClass(daysUntilExpiry: number): string {
    if (daysUntilExpiry < 0) {
      return "expiry-alert-expired";
    } else if (daysUntilExpiry <= 90) {
      return "expiry-alert-warning";
    } else {
      return "expiry-alert-normal";
    }
  }

  getExpiryAlertText(daysUntilExpiry: number): string {
    if (daysUntilExpiry < 0) {
      return `Expired ${Math.abs(daysUntilExpiry)} days ago`;
    } else if (daysUntilExpiry <= 90) {
      return `${daysUntilExpiry} days remaining`;
    } else {
      return `${daysUntilExpiry} days remaining`;
    }
  }

  getExpiryAlertIcon(daysUntilExpiry: number): string {
    if (daysUntilExpiry < 0) {
      return "⚠️";
    } else if (daysUntilExpiry <= 90) {
      return "⚠️";
    } else {
      return "📅";
    }
  }

  onViewCertificate(cert: Certification): void {
    console.log('Viewing certificate for:', cert.name);
    // Handle view certificate logic here
  }

  onRenewCertificate(cert: Certification): void {
    console.log('Renewing certificate for:', cert.name);
    // Handle renew certificate logic here
  }

  onDownloadCertificate(cert: Certification): void {
    console.log('Downloading certificate for:', cert.name);
    // Handle download certificate logic here
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  trackByCertId(index: number, cert: Certification): string {
    return cert.id;
  }
}
