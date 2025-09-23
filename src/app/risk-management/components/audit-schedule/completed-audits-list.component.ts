import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';
import { ScrollAreaComponent } from '../ui/scroll-area.component';

export interface CompletedAudit {
  id: string;
  supplier: string;
  auditType: string;
  date: string;
  auditor: string;
  location: string;
  auditScore: number;
  result: "passed" | "passed-with-conditions" | "failed";
  findings: number;
}

@Component({
  selector: 'app-completed-audits-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    ButtonComponent,
    BadgeComponent,
    ScrollAreaComponent
  ],
  templateUrl: './completed-audits-list.component.html',
  styleUrls: ['./completed-audits-list.component.scss']
})
export class CompletedAuditsListComponent {
  completedAudits: CompletedAudit[] = [
    {
      id: "1",
      supplier: "PharmaCorp Ltd",
      auditType: "GMP Audit",
      date: "2024-12-15",
      auditor: "Sarah Johnson",
      location: "Boston, MA",
      auditScore: 94,
      result: "passed",
      findings: 2,
    },
    {
      id: "2",
      supplier: "BioTech Solutions",
      auditType: "Quality Audit",
      date: "2024-12-10",
      auditor: "Michael Chen",
      location: "San Diego, CA",
      auditScore: 87,
      result: "passed-with-conditions",
      findings: 5,
    },
    {
      id: "3",
      supplier: "MedSupply Inc",
      auditType: "Compliance Audit",
      date: "2024-12-05",
      auditor: "Emily Davis",
      location: "Chicago, IL",
      auditScore: 72,
      result: "failed",
      findings: 12,
    },
    {
      id: "4",
      supplier: "ChemSource Ltd",
      auditType: "ISO Audit",
      date: "2024-11-28",
      auditor: "Robert Wilson",
      location: "Houston, TX",
      auditScore: 96,
      result: "passed",
      findings: 1,
    },
    {
      id: "5",
      supplier: "GlobalMed Corp",
      auditType: "FDA Inspection",
      date: "2024-11-20",
      auditor: "Lisa Anderson",
      location: "New York, NY",
      auditScore: 78,
      result: "passed-with-conditions",
      findings: 8,
    },
  ];

  getResultBadgeVariant(result: CompletedAudit["result"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (result) {
      case "passed":
        return "primary";
      case "passed-with-conditions":
        return "accent";
      case "failed":
        return "destructive";
      default:
        return "default";
    }
  }

  getResultBadgeText(result: CompletedAudit["result"]): string {
    switch (result) {
      case "passed":
        return "Passed";
      case "passed-with-conditions":
        return "Passed with Conditions";
      case "failed":
        return "Failed";
      default:
        return "";
    }
  }

  getScoreColor(score: number): string {
    if (score >= 90) return "score-high";
    if (score >= 75) return "score-medium";
    return "score-low";
  }

  onViewReport(audit: CompletedAudit): void {
    console.log('Viewing report for:', audit.supplier);
    // Handle view report logic here
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  trackByAuditId(index: number, audit: CompletedAudit): string {
    return audit.id;
  }
}
