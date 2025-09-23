import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';

export interface Module {
  id: string;
  name: string;
  description: string;
  keyFeatures: string[];
  icon: string;
  status: "active" | "beta" | "coming-soon";
  path: string;
}

@Component({
  selector: 'app-module-grid',
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
  templateUrl: './module-grid.component.html',
  styleUrls: ['./module-grid.component.scss']
})
export class ModuleGridComponent {
  modules: Module[] = [
    {
      id: "suppliers",
      name: "Supplier Management",
      description: "Manage pharmaceutical suppliers and track compliance",
      keyFeatures: ["Supplier Registration", "Compliance Tracking", "Risk Assessment", "Contact Management"],
      icon: "👥",
      status: "active",
      path: "/suppliers",
    },
    {
      id: "fda-forms",
      name: "FDA Forms",
      description: "Central hub for managing FDA-related forms and submissions",
      keyFeatures: ["Digital Form Submission", "Status Tracking", "Compliance Validation", "Historical Records"],
      icon: "📄",
      status: "active",
      path: "/fda-forms",
    },
    {
      id: "ai-analytics",
      name: "AI Analytics",
      description: "Analyze supplier and compliance data using AI-driven insights",
      keyFeatures: ["Predictive Risk Analysis", "Trend Identification", "Performance Scoring", "Anomaly Detection"],
      icon: "🧠",
      status: "beta",
      path: "/ai-analytics",
    },
    {
      id: "risk-monitoring",
      name: "Risk Monitoring",
      description: "Monitor ongoing supplier and process risks in real time",
      keyFeatures: ["Risk Alerts", "Heat Maps", "Issue Tracking", "Escalation Management"],
      icon: "📈",
      status: "active",
      path: "/risk",
    },
    {
      id: "audits",
      name: "Audit Schedule",
      description: "Plan and track internal and external audit schedules",
      keyFeatures: ["Calendar View", "Automated Reminders", "Assigned Auditors", "Progress Tracking"],
      icon: "📅",
      status: "active",
      path: "/audits",
    },
    {
      id: "findings",
      name: "Findings Tracker",
      description: "Log and manage findings from audits, inspections, and reviews",
      keyFeatures: ["Finding Registration", "Categorization", "Root Cause Analysis", "Status Updates"],
      icon: "⚠️",
      status: "active",
      path: "/findings",
    },
    {
      id: "compliance",
      name: "Compliance Dashboard",
      description: "Monitor regulatory compliance and certification status",
      keyFeatures: ["Compliance Cards", "Metrics", "Certification Management", "Audit Results"],
      icon: "🛡️",
      status: "active",
      path: "/compliance",
    },
    {
      id: "quality",
      name: "Quality Systems",
      description: "Manage and track pharmaceutical quality systems",
      keyFeatures: ["CAPA Tracking", "Batch Records", "Quality Scorecards", "Continuous Improvement Logs"],
      icon: "⚙️",
      status: "active",
      path: "/quality",
    },
  ];

  constructor(private router: Router) {}

  getStatusBadgeVariant(status: Module["status"]): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case "active":
        return "primary";
      case "beta":
        return "accent";
      case "coming-soon":
        return "outline";
      default:
        return "default";
    }
  }

  getStatusBadgeText(status: Module["status"]): string {
    switch (status) {
      case "active":
        return "Active";
      case "beta":
        return "Beta";
      case "coming-soon":
        return "Coming Soon";
      default:
        return "";
    }
  }

  getButtonVariant(status: Module["status"]): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
      case "coming-soon":
        return "outline";
      default:
        return "default";
    }
  }

  getButtonText(status: Module["status"]): string {
    switch (status) {
      case "coming-soon":
        return "Coming Soon";
      default:
        return "Access Module";
    }
  }

  onModuleClick(module: Module): void {
    if (module.status !== "coming-soon") {
      this.router.navigate([module.path]);
    }
  }

  trackByModuleId(index: number, module: Module): string {
    return module.id;
  }
}
