import { Routes } from '@angular/router';
import { SupplierDetailsComponent } from './risk-management/components/supplier-details/supplier-details.component';
import { Viewfindingdetails } from './risk-management/components/findings/viewfindingdetails/viewfindingdetails';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', loadComponent: () => import('./risk-management/components/pages/overview/overview.component').then(m => m.OverviewComponent) },
  { path: 'fda-forms', loadComponent: () => import('./risk-management/components/pages/fda-forms/fda-forms.component').then(m => m.FDAFormsComponent) },
  { path: 'suppliers', loadComponent: () => import('./risk-management/components/pages/suppliers/suppliers.component').then(m => m.SuppliersComponent) },
  { path: 'audits', loadComponent: () => import('./risk-management/components/pages/audits/audits.component').then(m => m.AuditsComponent) },
  { path: 'findings', loadComponent: () => import('./risk-management/components/pages/findings/findings.component').then(m => m.FindingsComponent) },
  { path: 'compliance', loadComponent: () => import('./risk-management/components/pages/compliance/compliance.component').then(m => m.ComplianceComponent) },
  { path: 'quality', loadComponent: () => import('./risk-management/components/pages/quality/quality.component').then(m => m.QualityComponent) },
  { path: 'documents', loadComponent: () => import('./risk-management/components/pages/documents/documents.component').then(m => m.DocumentsComponent) },
  { path: 'facilities', loadComponent: () => import('./risk-management/components/pages/facilities/facilities.component').then(m => m.FacilitiesComponent) },
  { path: 'navigation', loadComponent: () => import('./risk-management/components/pages/navigation/navigation.component').then(m => m.NavigationComponent) },
  { path: 'logistics', loadComponent: () => import('./risk-management/components/pages/logistics/logistics.component').then(m => m.LogisticsComponent) },
  { path: 'regulatory', loadComponent: () => import('./risk-management/components/pages/regulatory/regulatory.component').then(m => m.RegulatoryComponent) },
  { path: 'materials', loadComponent: () => import('./risk-management/components/pages/materials/materials.component').then(m => m.MaterialsComponent) },
  { path: 'manufacturing', loadComponent: () => import('./risk-management/components/pages/manufacturing/manufacturing.component').then(m => m.ManufacturingComponent) },
  { path: 'risk', loadComponent: () => import('./risk-management/components/pages/risk/risk.component').then(m => m.RiskComponent) },
  { path: 'ai-analytics', loadComponent: () => import('./risk-management/components/pages/ai-analytics/ai-analytics.component').then(m => m.AIAnalyticsComponent) },
  { path: 'suppliers/details', component: SupplierDetailsComponent },
  { path: 'audits/view', loadComponent: () => import('./risk-management/components/audit-schedule/viewaudits/viewaudits').then(m => m.Viewaudits) },
  { path: 'findings/view/:id', component : Viewfindingdetails}

];
