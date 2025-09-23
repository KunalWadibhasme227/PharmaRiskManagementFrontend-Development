import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';
import { ButtonComponent } from '../ui/button.component';
import { ScrollAreaComponent } from '../ui/scroll-area.component';

export interface SavedForm {
  id: string;
  name: string;
  type: string;
  status: "draft" | "in-review" | "completed";
  lastModified: string;
  submittedDate?: string;
}

@Component({
  selector: 'app-saved-forms-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    BadgeComponent,
    ButtonComponent,
    ScrollAreaComponent
  ],
  templateUrl: './saved-forms-list.component.html',
  styleUrls: ['./saved-forms-list.component.scss']
})
export class SavedFormsListComponent {
  savedForms: SavedForm[] = [
    {
      id: "1",
      name: "Drug Master File - API Submission",
      type: "DMF Type II",
      status: "completed",
      lastModified: "2024-12-15",
      submittedDate: "2024-12-15",
    },
    {
      id: "2",
      name: "Establishment Registration",
      type: "FDA 2656",
      status: "in-review",
      lastModified: "2024-12-10",
    },
    {
      id: "3",
      name: "Annual Report - Manufacturing",
      type: "FDA 2252",
      status: "draft",
      lastModified: "2024-12-08",
    },
    {
      id: "4",
      name: "Drug Listing Update",
      type: "FDA 2657",
      status: "completed",
      lastModified: "2024-12-05",
      submittedDate: "2024-12-05",
    },
    {
      id: "5",
      name: "Adverse Event Report",
      type: "FDA 3500A",
      status: "draft",
      lastModified: "2024-12-03",
    },
  ];

  getStatusBadgeVariant(status: SavedForm["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "completed":
        return "primary";
      case "in-review":
        return "accent";
      case "draft":
        return "outline";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: SavedForm["status"]): string {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-review":
        return "In Review";
      case "draft":
        return "Draft";
      default:
        return "";
    }
  }

  getStatusBorderColor(status: SavedForm["status"]): string {
    switch (status) {
      case "completed":
        return "border-l-primary";
      case "in-review":
        return "border-l-accent";
      case "draft":
        return "border-l-muted-foreground";
      default:
        return "border-l-border";
    }
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  onViewForm(form: SavedForm): void {
    console.log('Viewing form:', form.name);
    // Handle form view logic here
  }

  onEditForm(form: SavedForm): void {
    console.log('Editing form:', form.name);
    // Handle form edit logic here
  }

  onDownloadForm(form: SavedForm): void {
    console.log('Downloading form:', form.name);
    // Handle form download logic here
  }

  trackByFormId(index: number, form: SavedForm): string {
    return form.id;
  }
}
