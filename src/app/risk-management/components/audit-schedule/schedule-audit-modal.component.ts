import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent } from '../ui/select.component';
import { ModalComponent } from '../ui/modal.component';
import { TextareaComponent } from '../ui/textarea.component';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { ScheduleAuditService } from '../../shared/services/scheduleaudit/schedule-audit.service';

export interface ScheduleAuditFormData {
  date: string;
  time: string;
  supplier: string;
  auditor: string;
  auditType: string;
  comment: string;
}

@Component({
  selector: 'app-schedule-audit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    SelectTriggerComponent,
    SelectContentComponent,
    SelectItemComponent
  ],
  template: `
    <app-modal 
      [isOpen]="isOpen" 
      title="Schedule New Audit"
      (onClose)="onCloseModal()">
      
      <div class="form-container">
        <div class="form-grid">
          <!-- Date Picker -->
          <div class="form-field">
            <label class="form-label">Date</label>
            <app-input
              type="date"
              [value]="formData.date"
              (onInput)="onDateChange($event)"
              className="form-input">
            </app-input>
          </div>

          <!-- Time Picker -->
          <div class="form-field">
            <label class="form-label">Time</label>
            <app-input
              type="time"
              [value]="formData.time"
              (onInput)="onTimeChange($event)"
              className="form-input">
            </app-input>
          </div>

          <!-- Supplier Dropdown -->
          <div class="form-field">
            <label class="form-label">Supplier</label>
            <app-select [value]="formData.supplier">
              <app-select-trigger 
                placeholder="Select Supplier" 
                [value]="formData.supplier"
                className="form-select">
              </app-select-trigger>
              <app-select-content [isOpen]="supplierDropdownOpen">
                <app-select-item 
                  *ngFor="let supplier of suppliers" 
                  [value]="supplier"
                  (click)="onSupplierChange(supplier)">
                  {{ supplier }}
                </app-select-item>
              </app-select-content>
            </app-select>
          </div>

          <!-- Auditor Dropdown -->
          <div class="form-field">
            <label class="form-label">Auditor</label>
            <app-select [value]="formData.auditor">
              <app-select-trigger 
                placeholder="Select Auditor" 
                [value]="formData.auditor"
                className="form-select">
              </app-select-trigger>
              <app-select-content>
                <app-select-item 
                  *ngFor="let auditor of auditors" 
                  [value]="auditor.auditorId"
                  (click)="onAuditorChange(auditor)">
                  {{ auditor.name }}
                </app-select-item>
              </app-select-content>
            </app-select>
          </div>

          <!-- Audit Type Dropdown -->
          <div class="form-field">
            <label class="form-label">Audit Type</label>
            <app-select [value]="formData.auditType">
              <app-select-trigger 
                placeholder="Select Audit Type" 
                [value]="formData.auditType"
                className="form-select">
              </app-select-trigger>
              <app-select-content [isOpen]="auditTypeDropdownOpen">
                <app-select-item 
                  *ngFor="let type of auditTypes" 
                  [value]="type"
                  (click)="onAuditTypeChange(type)">
                  {{ type }}
                </app-select-item>
              </app-select-content>
            </app-select>
          </div>

          <!-- Comment Textarea -->
          <div class="form-field full-width">
            <label class="form-label">Comments</label>
            <app-textarea
              placeholder="Enter any additional comments or notes..."
              [value]="formData.comment"
              [rows]="4"
              (onInput)="onCommentChange($event)"
              className="form-textarea">
            </app-textarea>
          </div>
        </div>
      </div>

      <ng-container slot="footer">
        <app-button
          variant="outline"
          (onClick)="onCloseModal()"
          className="cancel-button">
          Cancel
        </app-button>
        <app-button
          variant="default"
          (onClick)="onSubmitForm()"
          className="submit-button">
          Schedule Audit
        </app-button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .form-container {
      padding: 0;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-field.full-width {
      grid-column: 1 / -1;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--foreground);
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
    }

    .cancel-button {
      margin-right: 0.5rem;
      color:red !important;
    }

    .submit-button {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    .submit-button:hover {
      background-color: color-mix(in srgb, var(--primary) 90%, transparent);
    }

    @media (max-width: 640px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ScheduleAuditModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<ScheduleAuditFormData>();
  auditors: any[] | null=[];
  auditTypes: any[] | null=[];

  constructor(private scheduleAuditService: ScheduleAuditService, private notify: NotificationService)
  {
    this.fetchAuditors();
    //this.fetchSuppliers();
    this.fetchAuditTypes();
  }
  formData: ScheduleAuditFormData = {
    date: '',
    time: '',
    supplier: '',
    auditor: '',
    auditType: '',
    comment: ''
  };
fetchAuditors() {
  this.scheduleAuditService.getAuditors().subscribe({
    next: (res: any) => {
      const data = res ?? [];

      if (!Array.isArray(data) || data.length === 0) {
        this.auditors = [];
        this.notify.Error('No auditors found');
        return;
      }

      this.auditors = data;
      console.log('Fetched auditors:', this.auditors);
    },
    error: (err: any) => {
      this.auditors = [];
      this.notify.Error('Failed to fetch auditors');
      console.error('Error fetching auditors:', err);
    }
  });
}


fetchAuditTypes() {
  this.scheduleAuditService.getAuditTypes().subscribe({
    next: (res: any) => {
      const data = res?.data ?? [];
      if (!Array.isArray(data) || data.length === 0) {
        this.auditTypes = [];
        this.notify.Error('No audit types found');
        return;
      }
      this.auditTypes = data;
      console.log('Fetched audit types:', this.auditTypes);
    },
    error: (err: any) => {
      this.auditTypes = [];
      this.notify.Error('Failed to fetch audit types');
      console.error('Error fetching audit types:', err);
    } 
  });
}

//  private buildRequest(): SupplierListRequest {
//     return {
//       search: '',
//       legalStructure: null,
//       primaryIndustry: null ,
//       classificationIds: null,
//       naics: null,
//       country: 2,
//       state:null,
//       city: null,
//       fromDate: null,
//       toDate:null,
//       yearEstablished: null,
//       noOfEmployees: { min: 0, max: 1000 },
//       annualRevenue: { min: 0, max: 1000000 },
//       PageNumber: 1,
//       PageSize: 10000,
//       isAllApproved: true,
//       isAllUnApproved: false,
//       inactive: null,
//       syncHistoryId: null,
//       epId: null
//     };
//   }

// fetchSuppliers(): void {
//   const request = this.buildRequest();
//   console.log('Fetching suppliers with request:', request); 
//   this.supplierService.getSuppliers(request).subscribe({
//     next: (res: any) => {
//       const items = res?.data?.paginatedResult?.items ?? [];
//       if (!Array.isArray(items) || items.length === 0) {
//         this.suppliers = [];
//         this.notify.Error('No suppliers found');
//         return;
//       }

//       // directly assign API objects
//       this.suppliers = items;
//       this.totalRecords = res?.data?.paginatedResult?.totalRecords ?? 0;
//       //this.pageNumber = res?.data?.paginatedResult?.pageNumber ?? 1;
//       //this.pageSize = res?.data?.paginatedResult?.pageSize ?? 5;

//       console.log('Raw suppliers:', this.suppliers);
//     },
//     error: (err) => {
//       console.error('Failed to load suppliers', err);
//       this.notify.Error('Failed to load suppliers. Please try again later.');
//       this.suppliers = [];
//       this.totalRecords = 0;
//       this.pageNumber = 1;
//       this.pageSize = 5;
//     }
//   });
// }

  // Static data for dropdowns
  suppliers = [
    'PharmaCorp Ltd',
    'MedTech Solutions',
    'BioSupply Corp',
    'GlobalMed Corp',
    'ChemSource Ltd',
    'HealthTech Inc',
    'BioPharma Solutions',
    'MedSupply Co'
  ];


  // Dropdown state
  supplierDropdownOpen = false;
  auditorDropdownOpen = false;
  auditTypeDropdownOpen = false;

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.formData.date = target.value;
  }

  onTimeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.formData.time = target.value;
  }

  onSupplierChange(supplier: string): void {
    this.formData.supplier = supplier;
    this.supplierDropdownOpen = false;
  }

  onAuditorChange(auditor: any): void {
    this.formData.auditor = auditor;
    this.auditorDropdownOpen = false;
  }

  onAuditTypeChange(auditType: string): void {
    this.formData.auditType = auditType;
    this.auditTypeDropdownOpen = false;
  }

  onCommentChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.formData.comment = target.value;
  }

  onCloseModal(): void {
    this.resetForm();
    this.onClose.emit();
  }

  onSubmitForm(): void {
    if (this.isFormValid()) {
      this.onSubmit.emit({ ...this.formData });
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return !!(this.formData.date && this.formData.time && this.formData.supplier && 
              this.formData.auditor && this.formData.auditType);
  }

  private resetForm(): void {
    this.formData = {
      date: '',
      time: '',
      supplier: '',
      auditor: '',
      auditType: '',
      comment: ''
    };
  }
}
