import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  lastUpdated: string;
  usageCount: number;
}

@Component({
  selector: 'app-form-templates',
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
  templateUrl: './form-templates.component.html',
  styleUrls: ['./form-templates.component.scss']
})
export class FormTemplatesComponent {
  templates: FormTemplate[] = [
    {
      id: "1",
      name: "Drug Master File Template",
      description: "Standard template for DMF Type II submissions",
      category: "DMF",
      version: "v2.1",
      lastUpdated: "2024-11-15",
      usageCount: 45,
    },
    {
      id: "2",
      name: "Establishment Registration",
      description: "FDA Form 2656 for facility registration",
      category: "Registration",
      version: "v1.8",
      lastUpdated: "2024-10-20",
      usageCount: 32,
    },
    {
      id: "3",
      name: "Annual Report Template",
      description: "FDA Form 2252 for annual manufacturing reports",
      category: "Reporting",
      version: "v1.5",
      lastUpdated: "2024-09-30",
      usageCount: 28,
    },
    {
      id: "4",
      name: "Drug Listing Template",
      description: "FDA Form 2657 for drug product listings",
      category: "Listing",
      version: "v2.0",
      lastUpdated: "2024-11-01",
      usageCount: 38,
    },
  ];

  onUseTemplate(template: FormTemplate): void {
    console.log('Using template:', template.name);
    // Handle template usage logic here
  }

  onDownloadTemplate(template: FormTemplate): void {
    console.log('Downloading template:', template.name);
    // Handle template download logic here
  }

  trackByTemplateId(index: number, template: FormTemplate): string {
    return template.id;
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
