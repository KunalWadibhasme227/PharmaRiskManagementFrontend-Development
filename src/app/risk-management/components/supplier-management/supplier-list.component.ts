import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { BadgeComponent } from '../ui/badge.component';
import { ScrollAreaComponent } from '../ui/scroll-area.component';
import { SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent } from '../ui/select.component';
import { SupplierService } from '../../services/supplier.service';
import { SupplierListRequest } from '../../models/supplier.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { SupplierStateService } from '../../shared/services/suppliers/supplier-state.service';
import { Commonservice } from '../../shared/services/common/commonservice.service';

export interface Supplier {
  id: string;
  name: string;
  type: string;
  location: string;
  compliance: "compliant" | "warning" | "non-compliant";
  contact: string;
  certificate: string;
  lastAudit: string;
  riskLevel: "low" | "medium" | "high";
}

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule, CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent,
    ButtonComponent, InputComponent, BadgeComponent, ScrollAreaComponent, FormsModule,
    MatFormFieldModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  searchTerm: string = '';
  filterType = 'all';
  suppliers: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalRecords = 0;
loading = false;
toDate: Date | null = null;   // status filter
fromDate: Date | null = null;   // status filter
isActive: boolean = false; // status filter
selectedCity:any;
selectedState:any;
cities: any[] | null = [];
states: any[] | null = [];




  constructor(private supplierService: SupplierService, private notify: NotificationService
    , private router: Router, private supplierState : SupplierStateService, private commonService: Commonservice) {
      this.fetchStates();
     }

  ngOnInit(): void {
    this.fetchSuppliers();
  }

  private buildRequest(): SupplierListRequest {
    return {
      search: this.searchTerm ?? '',
      legalStructure: null,
      primaryIndustry: this.filterType === 'all' ? null : this.filterType,
      classificationIds: null,
      naics: null,
      country: 2,
      state: this.selectedState,
      city: this.selectedCity,
      fromDate: this.fromDate ? this.fromDate.toISOString().split('T')[0] : null,
      toDate: this.toDate ? this.toDate.toISOString().split('T')[0] : null,
      yearEstablished: null,
      noOfEmployees: { min: 0, max: 1000 },
      annualRevenue: { min: 0, max: 1000000 },
      PageNumber: this.pageNumber,
      PageSize: this.pageSize,
      isAllApproved: true,
      isAllUnApproved: false,
      inactive: this.isActive,
      syncHistoryId: null,
      epId: null
    };
  }

  onStateChange(stateId: number) {
  console.log('Selected state ID:', stateId);
  // Fetch cities based on selected state
  this.commonService.getCitiesByState(stateId).subscribe({  
    next: (res: any) => {
      const items = res ?? [];
      if (!Array.isArray(items) || items.length === 0) {
        this.cities = [];
        //this.notify.Error('No cities found for the selected state');
        return;
      }
      this.cities = items;
      console.log('cities:', this.cities);
    },
    error: (err) => {
      console.error('Failed to load cities', err);
      //this.notify.Error('Failed to load cities. Please try again later.');
    }
  });
}

fetchSuppliers(): void {
  const request = this.buildRequest();
  console.log('Fetching suppliers with request:', request); 
  this.supplierService.getSuppliers(request).subscribe({
    next: (res: any) => {
      const items = res?.data?.paginatedResult?.items ?? [];
      if (!Array.isArray(items) || items.length === 0) {
        this.suppliers = [];
        this.notify.Error('No suppliers found');
        return;
      }

      // directly assign API objects
      this.suppliers = items;
      this.totalRecords = res?.data?.paginatedResult?.totalRecords ?? 0;
      //this.pageNumber = res?.data?.paginatedResult?.pageNumber ?? 1;
      //this.pageSize = res?.data?.paginatedResult?.pageSize ?? 5;

      console.log('Raw suppliers:', this.suppliers);
    },
    error: (err) => {
      console.error('Failed to load suppliers', err);
      this.notify.Error('Failed to load suppliers. Please try again later.');
      this.suppliers = [];
      this.totalRecords = 0;
      this.pageNumber = 1;
      this.pageSize = 5;
    }
  });
}

// Helper to classify numeric rating to Supplier riskLevel
private mapRisk(rating: number | null | undefined): 'low' | 'medium' | 'high' {
  if (!rating) return 'low';
  if (rating < 2) return 'low';
  if (rating < 4) return 'medium';
  return 'high';
}

mapRiskText(rating: number | null | undefined): string {
  if (!rating) return 'Low Risk';
  if (rating < 2) return 'Low Risk';
  if (rating < 4) return 'Medium Risk';
  return 'High Risk';
}

mapRiskClass(rating: number | null | undefined): string {
  if (!rating) return 'risk-badge-low';
  if (rating < 2) return 'risk-badge-low';
  if (rating < 4) return 'risk-badge-medium';
  return 'risk-badge-high';
}

prevPage() {
  if (this.pageNumber > 1) {
    this.pageNumber--;
    this.fetchSuppliers();
  }
}

nextPage() {
  if (this.pageNumber * this.pageSize < this.totalRecords) {
    this.pageNumber++;
    this.fetchSuppliers();
  }
}

/** Helpers for disabling */
canGoPrev(): boolean {
  return this.pageNumber > 1;
}

canGoNext(): boolean {
  return this.pageNumber * this.pageSize < this.totalRecords;
}
get totalPages(): number {
  return this.totalRecords > 0 ? Math.ceil(this.totalRecords / this.pageSize) : 1;
}

applyFilter(): void {
  this.fetchSuppliers();
  
}
clearFilters(): void {
  this.filterType = 'all';
  this.fromDate = null;
  this.toDate = null;
  this.isActive = false;
  this.selectedState = null;
  this.selectedCity = null;
  this.fetchSuppliers();
}

fetchStates(): void {
  this.commonService.getStates().subscribe({
    next: (res: any) => {
      const items = res ?? [];  
      if (!Array.isArray(items) || items.length === 0) {
        //this.notify.Error('No states found');
        return;
      }
      this.states = items;
      console.log('states:', this.states);
    }
  ,
    error: (err) => {
      console.error('Failed to load states', err);
      //this.notify.Error('Failed to load states. Please try again later.');
    }
  });
}
  
  // getComplianceBadgeVariant(compliance: Supplier["compliance"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
  //   switch (compliance) {
  //     case "compliant":
  //       return "primary";
  //     case "warning":
  //       return "accent";
  //     case "non-compliant":
  //       return "destructive";
  //     default:
  //       return "default";
  //   }
  // }

  // getComplianceBadgeText(compliance: Supplier["compliance"]): string {
  //   switch (compliance) {
  //     case "compliant":
  //       return "Compliant";
  //     case "warning":
  //       return "Warning";
  //     case "non-compliant":
  //       return "Non-Compliant";
  //     default:
  //       return "";
  //   }
  // }

  // getRiskBadgeVariant(riskLevel: Supplier["riskLevel"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
  //   switch (riskLevel) {
  //     case "low":
  //       return "outline";
  //     case "medium":
  //       return "outline";
  //     case "high":
  //       return "outline";
  //     default:
  //       return "outline";
  //   }
  // }

  // getRiskBadgeText(riskLevel: Supplier["riskLevel"]): string {
  //   switch (riskLevel) {
  //     case "low":
  //       return "Low Risk";
  //     case "medium":
  //       return "Medium Risk";
  //     case "high":
  //       return "High Risk";
  //     default:
  //       return "";
  //   }
  // }

  // getRiskBadgeClass(riskLevel: Supplier["riskLevel"]): string {
  //   switch (riskLevel) {
  //     case "low":
  //       return "risk-badge-low";
  //     case "medium":
  //       return "risk-badge-medium";
  //     case "high":
  //       return "risk-badge-high";
  //     default:
  //       return "";
  //   }
  // }

// onSearchChange(event: Event): void {
//   const target = event.target as HTMLInputElement;
//   this.searchTerm = target.value;
//   console.log('Search term changed to:', this.searchTerm);
//   this.fetchSuppliers();
// }

debounceTimer: any;

onSearchChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.searchTerm = target.value;
  // Clear previous timer
  // clearTimeout(this.debounceTimer);
  // this.debounceTimer = setTimeout(() => {
  //     this.fetchSuppliers(); 
  // }, 500); // Delay in milliseconds
  if(this.searchTerm.length>=3)
  { this.fetchSuppliers();}
  if(this.searchTerm.length==0)
  { this.fetchSuppliers();}
}


  onFilterChange(filterType: string): void {
    this.filterType = filterType;
  }

  onAddSupplier(): void {
    console.log('Adding new supplier');
    // Handle add supplier logic here
  }

onViewDetails(supplier: any): void {
  this.supplierState.setSupplier(supplier);
  this.router.navigate(['/suppliers/details']);
}

  onContact(supplier: Supplier): void {
    console.log('Contacting:', supplier.name);
    // Handle contact logic here
  }

  onScheduleAudit(supplier: Supplier): void {
    console.log('Scheduling audit for:', supplier.name);
    // Handle schedule audit logic here
  }

  onGenerateReport(supplier: Supplier): void {
    console.log('Generating report for:', supplier.name);
    // Handle generate report logic here
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  trackBySupplierId(index: number, supplier: Supplier): string {
    return supplier.id;
  }
}
