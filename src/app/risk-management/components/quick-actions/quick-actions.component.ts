import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button.component';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any; // We'll use any for the icon component
  variant: "default" | "outline" | "ghost" | "secondary" | "destructive";
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
  ],
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent {
  quickActions: QuickAction[] = [
    {
      id: "add-supplier",
      title: "Add Supplier",
      description: "Register a new supplier",
      icon: null, // We'll handle icons separately
      variant: "default",
    },
    {
      id: "schedule-audit",
      title: "Schedule Audit",
      description: "Create new audit schedule",
      icon: null,
      variant: "outline",
    },
    {
      id: "generate-report",
      title: "Generate Report",
      description: "Create compliance report",
      icon: null,
      variant: "outline",
    },
    {
      id: "view-analytics",
      title: "View Analytics",
      description: "Open analytics dashboard",
      icon: null,
      variant: "outline",
    },
    {
      id: "manage-findings",
      title: "Manage Findings",
      description: "Track audit findings",
      icon: null,
      variant: "outline",
    },
    {
      id: "supplier-overview",
      title: "Supplier Overview",
      description: "View all suppliers",
      icon: null,
      variant: "outline",
    },
  ];

  onActionClick(action: QuickAction): void {
    console.log('Action clicked:', action.id);
    // Handle action click logic here
  }

  trackByActionId(index: number, action: QuickAction): string {
    return action.id;
  }
}
