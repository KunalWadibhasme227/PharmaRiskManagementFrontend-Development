import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Icon components (we'll create these as simple SVG components)
import { BarChart3Icon } from './icons/bar-chart-3.icon';
import { FileTextIcon } from './icons/file-text.icon';
import { UsersIcon } from './icons/users.icon';
import { CalendarIcon } from './icons/calendar.icon';
import { AlertTriangleIcon } from './icons/alert-triangle.icon';
import { ShieldIcon } from './icons/shield.icon';
import { SettingsIcon } from './icons/settings.icon';
import { FileCheckIcon } from './icons/file-check.icon';
import { BuildingIcon } from './icons/building.icon';
import { NavigationIcon } from './icons/navigation.icon';
import { TruckIcon } from './icons/truck.icon';
import { ScaleIcon } from './icons/scale.icon';
import { PackageIcon } from './icons/package.icon';
import { FactoryIcon } from './icons/factory.icon';
import { TrendingUpIcon } from './icons/trending-up.icon';
import { BrainIcon } from './icons/brain.icon';
import { ChevronLeftIcon } from './icons/chevron-left.icon';
import { ChevronRightIcon } from './icons/chevron-right.icon';
import { HomeIcon } from './icons/home.icon';

export interface Module {
  id: string;
  name: string;
  icon: any;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    BarChart3Icon,
    FileTextIcon,
    UsersIcon,
    CalendarIcon,
    AlertTriangleIcon,
    ShieldIcon,
    SettingsIcon,
    FileCheckIcon,
    BuildingIcon,
    NavigationIcon,
    TruckIcon,
    ScaleIcon,
    PackageIcon,
    FactoryIcon,
    TrendingUpIcon,
    BrainIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    HomeIcon
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() activeModule: string = 'overview';
  @Output() moduleChange = new EventEmitter<string>();

  collapsed = false;

  constructor(private router: Router) {}

  modules: Module[] = [
    { id: 'overview', name: 'Overview', icon: HomeIcon, path: '/' },
    { id: 'navigation', name: 'System Navigation', icon: NavigationIcon, path: '/navigation' },
    { id: 'fda-forms', name: 'FDA Forms', icon: FileTextIcon, path: '/fda-forms' },
    { id: 'suppliers', name: 'Supplier Management', icon: UsersIcon, path: '/suppliers' },
    { id: 'audits', name: 'Audit Schedule', icon: CalendarIcon, path: '/audits' },
    { id: 'findings', name: 'Findings Tracker', icon: AlertTriangleIcon, path: '/findings' },
    { id: 'compliance', name: 'Compliance Dashboard', icon: ShieldIcon, path: '/compliance' },
    { id: 'quality', name: 'Quality Systems', icon: SettingsIcon, path: '/quality' },
    { id: 'documents', name: 'Document Management', icon: FileCheckIcon, path: '/documents' },
    { id: 'facilities', name: 'Facilities & Equipment', icon: BuildingIcon, path: '/facilities' },
    { id: 'logistics', name: 'Supply Chain Logistics', icon: TruckIcon, path: '/logistics' },
    { id: 'regulatory', name: 'Regulatory Compliance', icon: ScaleIcon, path: '/regulatory' },
    { id: 'materials', name: 'Material Handling', icon: PackageIcon, path: '/materials' },
    { id: 'manufacturing', name: 'Manufacturing Audit', icon: FactoryIcon, path: '/manufacturing' },
    { id: 'risk', name: 'Risk Monitoring', icon: TrendingUpIcon, path: '/risk' },
    { id: 'ai-analytics', name: 'AI Analytics', icon: BrainIcon, path: '/ai-analytics' }
  ];

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  handleModuleClick(moduleId: string, path: string): void {
    this.router.navigate([path]);
    this.moduleChange.emit(moduleId);
  }

  isActive(moduleId: string): boolean {
    return this.activeModule === moduleId;
  }
}
