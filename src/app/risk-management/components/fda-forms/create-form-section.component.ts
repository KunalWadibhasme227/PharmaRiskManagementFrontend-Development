import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';

export interface AvailableForm {
  id: string;
  name: string;
  description: string;
  formNumber: string;
  category: string;
  estimatedTime: string;
  complexity: "simple" | "moderate" | "complex";
}

@Component({
  selector: 'app-create-form-section',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    ButtonComponent,
    BadgeComponent
  ],
  templateUrl: './create-form-section.component.html',
  styleUrls: ['./create-form-section.component.scss']
})
export class CreateFormSectionComponent {
  availableForms: AvailableForm[] = [
    {
      id: "1",
      name: "Drug Master File",
      description: "Submit confidential detailed information about facilities, processes, or articles",
      formNumber: "DMF Type II",
      category: "Registration",
      estimatedTime: "45-60 min",
      complexity: "complex",
    },
    {
      id: "2",
      name: "Establishment Registration",
      description: "Register manufacturing, packaging, or labeling facilities",
      formNumber: "FDA 2656",
      category: "Registration",
      estimatedTime: "15-20 min",
      complexity: "simple",
    },
    {
      id: "3",
      name: "Drug Listing",
      description: "List all drugs manufactured, prepared, propagated, compounded, or processed",
      formNumber: "FDA 2657",
      category: "Listing",
      estimatedTime: "20-30 min",
      complexity: "moderate",
    },
    {
      id: "4",
      name: "Annual Report",
      description: "Submit annual manufacturing and quality reports",
      formNumber: "FDA 2252",
      category: "Reporting",
      estimatedTime: "30-45 min",
      complexity: "moderate",
    },
  ];

  getComplexityBadgeVariant(complexity: AvailableForm["complexity"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (complexity) {
      case "simple":
        return "primary";
      case "moderate":
        return "accent";
      case "complex":
        return "destructive";
      default:
        return "default";
    }
  }

  getComplexityBadgeText(complexity: AvailableForm["complexity"]): string {
    switch (complexity) {
      case "simple":
        return "Simple";
      case "moderate":
        return "Moderate";
      case "complex":
        return "Complex";
      default:
        return "";
    }
  }

  onCreateForm(form: AvailableForm): void {
    console.log('Creating form:', form.name);
    // Handle form creation logic here
  }

  onPreviewForm(form: AvailableForm): void {
    console.log('Previewing form:', form.name);
    // Handle form preview logic here
  }

  onNewForm(): void {
    console.log('Creating new form');
    // Handle new form creation logic here
  }

  onImportForm(): void {
    console.log('Importing form');
    // Handle form import logic here
  }

  onExportPDF(): void {
    console.log('Exporting PDF');
    // Handle PDF export logic here
  }

  trackByFormId(index: number, form: AvailableForm): string {
    return form.id;
  }
}
