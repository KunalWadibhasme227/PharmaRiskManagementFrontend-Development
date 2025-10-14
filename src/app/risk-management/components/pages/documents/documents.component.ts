import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { TabsComponent, TabsContentComponent, TabsListComponent, TabsTriggerComponent } from '../../ui/tabs.component';
import { ButtonComponent } from '../../ui/button.component';
import { CardComponent, CardContentComponent, CardDescriptionComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';
import { InputComponent } from '../../ui/input.component';
import { BadgeComponent } from '../../ui/badge.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { Uploaddocumentcomponent } from '../../uploaddocumentcomponent/uploaddocumentcomponent';
import { Uploaddocument } from '../../../shared/services/Uploaddocument/uploaddocument';
import { UploadDocumentDto, UploadDocumentRequestDto } from '../../../models/Uploaddocumentmodel/uploaddocument';
export interface Document {
  id: number;
  name: string;
  category: string;
  supplier: string;
  version: string;
  status: "Approved" | "Under Review" | "Expired";
  uploadDate: string;
  expiryDate: string;
  size: string;
}

export interface Category {
  name: string;
  count: number;
  pending: number;
}

export interface Workflow {
  id: number;
  name: string;
  status: "Active" | "Paused";
  documents: number;
  avgTime: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    DashboardHeaderComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    CardDescriptionComponent,
    CardHeaderComponent,
    CardTitleComponent,
    InputComponent,
    BadgeComponent
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  activeTab = 'documents';
  activeModule = 'documents';
  searchTerm = '';
  documents: UploadDocumentDto[] = []; 
  

  categories: Category[] = [
    { name: "Certifications", count: 45, pending: 3 },
    { name: "Audit Reports", count: 28, pending: 5 },
    { name: "Contracts", count: 32, pending: 2 },
    { name: "SOPs", count: 67, pending: 8 },
    { name: "Quality Agreements", count: 23, pending: 1 },
  ];

  workflows: Workflow[] = [
    {
      id: 1,
      name: "Document Review Process",
      status: "Active",
      documents: 8,
      avgTime: "3.2 days",
    },
    {
      id: 2,
      name: "FDA Submission Workflow",
      status: "Active",
      documents: 5,
      avgTime: "5.1 days",
    },
    {
      id: 3,
      name: "Audit Report Approval",
      status: "Paused",
      documents: 3,
      avgTime: "2.8 days",
    },
  ];

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private uploadService: Uploaddocument) {
      this.loadDocuments();
    }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments() {
    const payload: UploadDocumentRequestDto = {
      searchText: this.searchTerm,
      pageNumber: 1,
      pageSize: 10
    };

    this.uploadService.getUploadDocumentList(payload).subscribe({
      next: (res) => {
        console.log('Documents fetched:', res);
        // assuming your API returns an object of type PagedUploadDocumentDto
        this.documents = res.records || [];
      },
      error: (err) => console.error('Error loading documents:', err)
    });
  }
  
  onViewDocument(documentId: number): void {
    this.router.navigate(['/documents/view', documentId]);
  }




  //   onViewDocument(document: any): void {
  //   this.uploadService.DetailsUploadDocument(document.documentId).subscribe({
  //     next: (res) => {
  //       console.log('Document details:', res);
  //       // You can open a dialog or redirect to a detail page
  //       const dialogRef = this.dialog.open(Uploaddocumentcomponent, {
  //         width: '800px',
  //         data: res
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Error fetching document details:', err);
  //     }
  //   });
  // }

  onViewDetails(document: any): void {
    this.uploadService.setDocument(document);
    this.router.navigate(['/audits/view']);
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onModuleChange(module: string): void {
    this.activeModule = module;
  }


 getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status as "Approved" | "Under Review" | "Expired") {
      case "Approved":
        return "default";
      case "Under Review":
        return "secondary";
      case "Expired":
        return "destructive";
      default:
        return "outline";
    }
  }


  getWorkflowStatusColor(status: Workflow["status"]): string {
    return status === "Active" ? "workflow-active" : "workflow-paused";
  }

  onUploadDocument(): void {
     const dialogRef = this.dialog.open(Uploaddocumentcomponent, {
              width: '800px',
              panelClass: 'uploaddocument-dialog-panel'
            });
        
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                console.log('uploaddocument Form Submitted:', result);
                // send result to backend via service
              }
            });
  }

  onDownloadDocument(doc: any): void {
    this.uploadService.DownloadUploadDocument(doc.documentId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a'); // now this refers to global document
        a.href = url;
        a.download = doc.documentName || 'Document';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download error:', err);
      }
    });
  }

  onEditDocument(documentId: number): void {
    
    const ref = this.dialog.open(Uploaddocumentcomponent, {
      
      width: '800px',
      data: { id: documentId }
    });

    ref.afterClosed().subscribe(() => {
    this.loadDocuments();
    });
    
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.loadDocuments();
  }




  onNewCategory(): void {
    console.log('New category clicked');
    // Handle new category logic here
  }

  // onViewDocument(document: Document): void {
  //   console.log('View document:', document.name);
  //   // Handle view logic here
  // }

  // onDownloadDocument(document: Document): void {
  //   console.log('Download document:', document.name);
  //   // Handle download logic here
  // }

  // onEditDocument(document: Document): void {
  //   console.log('Edit document:', document.name);
  //   // Handle edit logic here
  // }

    // onSearchChange(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   this.searchTerm = target.value;
  // }


  onViewWorkflow(workflow: Workflow): void {
    console.log('View workflow:', workflow.name);
    // Handle view workflow logic here
  }

  onEditWorkflow(workflow: Workflow): void {
    console.log('Edit workflow:', workflow.name);
    // Handle edit workflow logic here
  }

  onCreateWorkflow(): void {
    console.log('Create workflow clicked');
    // Handle create workflow logic here
  }

  trackByDocumentId(index: number, document: UploadDocumentDto): number {
    return document.documentId;
  }

  trackByCategoryIndex(index: number, category: Category): number {
    return index;
  }

  trackByWorkflowId(index: number, workflow: Workflow): number {
    return workflow.id;
  }
}
