// supplier-details.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';
import { ScrollAreaComponent } from '../ui/scroll-area.component';
import { SelectComponent, SelectContentComponent, SelectItemComponent, SelectTriggerComponent } from '../ui/select.component';
import { SupplierStateService } from '../../shared/services/suppliers/supplier-state.service';

@Component({
  selector: 'app-supplier-details',
  imports: [CommonModule,DashboardHeaderComponent, CardComponent,
      CardContentComponent,
      CardHeaderComponent,
      CardTitleComponent,
      ButtonComponent,BadgeComponent,
          ScrollAreaComponent,
          SelectComponent,
          SelectTriggerComponent,
          SelectContentComponent,
          SelectItemComponent],
  templateUrl: './supplier-details.component.html',
  styleUrl: './supplier-details.component.scss'
})

export class SupplierDetailsComponent implements OnInit {
  supplier?: any;

  constructor(private route: Router, 
    private supplierState : SupplierStateService, private location:Location) {}

  ngOnInit(): void {
     this.supplier = this.supplierState.getCurrentSupplier();
    console.log("Supplier- detials",this.supplier);
  }
goBack(): void {
    this.location.back();
  }

  // --- Badge helpers (map to your allowed variants)
  getComplianceBadgeVariant(isApproved: boolean | null | undefined): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    if (isApproved === true) return 'primary';
    if (isApproved === false) return 'destructive';
    return 'secondary';
  }

  getComplianceBadgeText(isApproved: boolean | null | undefined): string {
    if (isApproved === true) return 'Compliant';
    if (isApproved === false) return 'Non-Compliant';
    return 'Unknown';
  }

  getRiskBadgeVariant(rating: number | null | undefined): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    if (rating == null) return 'outline';
    if (rating >= 4) return 'destructive';
    if (rating >= 2) return 'accent';
    return 'primary';
  }

  getRiskBadgeText(rating: number | null | undefined): string {
    if (rating == null) return 'Low Risk';
    if (rating >= 4) return 'High Risk';
    if (rating >= 2) return 'Medium Risk';
    return 'Low Risk';
  }

  mapRiskClass(rating: number | null | undefined): string {
    if (rating == null) return 'risk-badge-low';
    if (rating >= 4) return 'risk-badge-high';
    if (rating >= 2) return 'risk-badge-medium';
    return 'risk-badge-low';
  }

  // Safe date formatting helper (useful if the template needs it)
  formatDateSafe(value: any): string {
    if (!value) return 'N/A';
    try {
      const d = new Date(value);
      if (isNaN(d.getTime())) return 'N/A';
      return d.toLocaleDateString();
    } catch {
      return 'N/A';
    }
  }
  formatNumber(value: number | null | undefined): string {
  if (value == null) return 'N/A';
  return new Intl.NumberFormat('en-US').format(value);
}

getRiskScoresText(s: any): string {
  if (!s?.riskScores || !s.riskScores.length) return 'N/A';
  // riskScores may be array of objects like { name, score } or numbers
  return s.riskScores.map((r: any) => r?.score ?? r?.value ?? r).join(', ');
}


/** Text shown inside the pill */
getRiskBadgeTextFromRating(rating: number | null | undefined): string {
  if (rating == null) return 'Low Risk';
  if (rating >= 4) return 'High Risk';
  if (rating >= 2) return 'Medium Risk';
  return 'Low Risk';
}

/** Existing CSS class names you already use in the list */
getRiskBadgeClassFromRating(rating: number | null | undefined): string {
  if (rating == null) return 'risk-badge-low';
  if (rating >= 4) return 'risk-badge-high';
  if (rating >= 2) return 'risk-badge-medium';
  return 'risk-badge-low';
}

}