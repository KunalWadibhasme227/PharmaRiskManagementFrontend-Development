// import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ButtonComponent } from '../ui/button.component';
// import { InputComponent } from '../ui/input.component';
// import { SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent } from '../ui/select.component';
// import { ModalComponent } from '../ui/modal.component';
// import { TextareaComponent } from '../ui/textarea.component';
// import { NotificationService } from '../../../shared/services/notification/notification.service';
// import { ScheduleAuditService } from '../../shared/services/scheduleaudit/schedule-audit.service';
// import { SupplierListRequest } from '../../models/supplier.model';
// import { SupplierService } from '../../services/supplier.service';
// import { SupplierStateService } from '../../shared/services/suppliers/supplier-state.service';

// export interface ScheduleAuditFormData {
//   auditId: string;
//   date: string;
//   time: string;
//   supplier: string;
//   auditor: string;
//   auditType: string;
//   comment: string;
// }

// @Component({
//   selector: 'app-schedule-audit-modal',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ModalComponent,
//     ButtonComponent,
//     InputComponent,
//     TextareaComponent,
//     SelectComponent,
//     SelectTriggerComponent,
//     SelectContentComponent,
//     SelectItemComponent
//   ],
//   template: `
//     <app-modal 
//       [isOpen]="isOpen" 
//       title="Schedule New Audit"
//       (onClose)="onCloseModal()">
      
//       <div class="form-container">
//         <div class="form-grid">
//           <!-- Date Picker -->
//           <div class="form-field">
//             <label class="form-label">Date</label>
//             <app-input
//               type="date"
//               [value]="formData.date"
//               (onInput)="onDateChange($event)"
//               className="form-input" 
//               [min]="currentdate">
//             </app-input>
//           </div>

//           <!-- Time Picker -->
//           <div class="form-field">
//             <label class="form-label">Time</label>
//             <app-input
//               type="time"
//               [min]="minTime"
//               [value]="formData.time"
//               (onInput)="onTimeChange($event)"
//               className="form-input">
//             </app-input>
//           </div>

//           <!-- Supplier Dropdown -->
//           <div class="form-field" #supplierDropdown>
//             <label class="form-label">Supplier</label>
//             <app-select [value]="formData.supplier">
//               <app-select-trigger 
//                 placeholder="Select Supplier" 
//                 [value]="getSelectedSupplierName()"
//                 (click)="toggleSupplierDropdown($event)">
//               </app-select-trigger>
//               <app-select-content [isOpen]="supplierDropdownOpen">
//                 <app-select-item 
//                   *ngFor="let supplier of suppliers" 
//                   [value]="supplier.companyId"
//                   (click)="onSupplierChange(supplier)">
//                   {{ supplier.companyName}}
//                 </app-select-item>
//               </app-select-content>
//             </app-select>
//           </div>

//           <!-- Auditor Dropdown -->
//           <div class="form-field" #auditorDropdown>
//             <label class="form-label">Auditor</label>
//             <app-select [value]="formData.auditor">
//               <app-select-trigger 
//                 placeholder="Select Auditor" 
//                 [value]="getSelectedAuditorName()"
//                 (click)="toggleAuditorDropdown($event)">
//               </app-select-trigger>
//               <app-select-content [isOpen]="auditorDropdownOpen">
//                 <app-select-item 
//                   *ngFor="let auditor of auditors" 
//                   [value]="auditor.auditorId"
//                   (click)="onAuditorChange(auditor)">
//                   {{ auditor.name || auditor.auditorName || auditor }}
//                 </app-select-item>
//               </app-select-content>
//             </app-select>
//           </div>

//           <!-- Audit Type Dropdown -->
//           <div class="form-field" #auditTypeDropdown>
//             <label class="form-label">Audit Type</label>
//             <app-select [value]="formData.auditType">
//               <app-select-trigger 
//                 placeholder="Select Audit Type" 
//                 [value]="getSelectedAuditorTypeName()"
//                 (click)="toggleAuditTypeDropdown($event)">
//               </app-select-trigger>
//               <app-select-content [isOpen]="auditTypeDropdownOpen">
//                 <app-select-item 
//                   *ngFor="let type of auditTypes" 
//                   [value]="type.auditTypeId"
//                   (click)="onAuditTypeChange(type)">
//                   {{ type.typeName}}
//                 </app-select-item>
//               </app-select-content>
//             </app-select>
//           </div>

//           <!-- Comment Textarea -->
//           <div class="form-field full-width">
//             <label class="form-label">Comments</label>
//             <app-textarea
//               placeholder="Enter any additional comments or notes..."
//               [value]="formData.comment"
//               [rows]="3"
//               [maxLength]="200"
//               [required]="true"
//               (onInput)="onCommentChange($event)"
//               className="form-textarea">
//             </app-textarea>
//           </div>
//         </div>
//       </div>

//       <ng-container slot="footer">
//         <app-button
//           variant="secondary"
//           (onClick)="onCloseModal()"
//           className="cancel-button">
//           Cancel
//         </app-button>
//         <app-button
//           variant="default"
//           (onClick)="onSubmitForm()"
//           className="submit-button" *ngIf="!editMode">
//           Schedule Audit
//         </app-button>
//         <app-button
//           variant="default"
//           (onClick)="onSubmitForm()"
//           className="submit-button" *ngIf="editMode">
//           Reschedule Audit
//         </app-button>
//       </ng-container>
//     </app-modal>
//   `,
//   styles: [`
//     .form-container {
//       padding: 0;
//     }

//     .form-grid {
//       display: grid;
//       grid-template-columns: 1fr 1fr;
//       gap: 1rem;
//     }

//     .form-field {
//       display: flex;
//       flex-direction: column;
//       gap: 0.5rem;
//     }

//     .form-field.full-width {
//       grid-column: 1 / -1;
//     }

//     .form-label {
//       font-size: 0.875rem;
//       font-weight: 500;
//       color: var(--foreground);
//     }

//     .form-input,
//     .form-select,
//     .form-textarea {
//       width: 100%;
//     }

//     .cancel-button {
//       margin-right: 0.5rem;
//       color:red !important;
//     }

//     .submit-button {
//       background-color: var(--primary);
//       color: var(--primary-foreground);
//     }

//     .submit-button:hover {
//       background-color: color-mix(in srgb, var(--primary) 90%, transparent);
//     }

//     @media (max-width: 640px) {
//       .form-grid {
//         grid-template-columns: 1fr;
//       }
//     }
//   `]
// })
// export class ScheduleAuditModalComponent {
//   @Input() isOpen: boolean = false;
//   @Output() onClose = new EventEmitter<void>();
//   @Output() onSubmit = new EventEmitter<ScheduleAuditFormData>();

//   // ViewChild references for dropdown containers
//   @ViewChild('supplierDropdown', { static: false }) supplierDropdownRef!: ElementRef;
//   @ViewChild('auditorDropdown', { static: false }) auditorDropdownRef!: ElementRef;
//   @ViewChild('auditTypeDropdown', { static: false }) auditTypeDropdownRef!: ElementRef;

//   // Initialize as empty arrays
//   auditors: any[] = [];
//   auditTypes: any[] = [];
//   suppliers: any[] = []; // Remove the static data
//   currentdate: string = new Date().toISOString().split('T')[0]; // "2025-09-25"
//   audit?: any;
//   editMode: boolean = false;
//   minTime: string | null = '';
//   istimevalid: boolean = false;


//   // Store selected objects for display purposes
//   selectedSupplier: any = null;
//   selectedAuditor: any = null;
//   selectedAuditorType: any;

//   constructor(
//     private scheduleAuditService: ScheduleAuditService, private notify: NotificationService,
//     private supplierService: SupplierService, private supplierState: SupplierStateService, private auditService: ScheduleAuditService
//   ) {
//     this.fetchAuditors();
//     this.fetchSuppliers();
//     this.fetchAuditTypes();
//   }

//   ngOnChanges(): void {
//     this.audit = this.supplierState.getCurrentSupplier();
//     console.log("Received audit for editing:", this.audit);
//     if (this.audit) {
//       this.editMode = true;
//       this.patchAuditData();
//     }
//   }

//   formData: ScheduleAuditFormData = {
//     auditId: '',
//     date: '',
//     time: '',
//     supplier: '',
//     auditor: '',
//     auditType: '',
//     comment: ''
//   };

//   // Dropdown state
//   supplierDropdownOpen = false;
//   auditorDropdownOpen = false;
//   auditTypeDropdownOpen = false;

//   fetchAuditors() {
//     this.scheduleAuditService.getAuditors().subscribe({
//       next: (res: any) => {
//         console.log('Raw auditors response:', res);
//         const data = res ?? [];

//         if (!Array.isArray(data)) {
//           // If it's not an array, check if it has a data property
//           const actualData = res?.data || res?.items || [];
//           if (Array.isArray(actualData)) {
//             this.auditors = actualData;
//           } else {
//             this.auditors = [];
//             this.notify.Error('Invalid auditors data format');
//             return;
//           }
//         } else {
//           this.auditors = data;
//         }

//         if (this.auditors.length === 0) {
//           this.notify.Error('No auditors found');
//         }

//         console.log('Processed auditors:', this.auditors);
//       },
//       error: (err: any) => {
//         this.auditors = [];
//         this.notify.Error('Failed to fetch auditors');
//         console.error('Error fetching auditors:', err);
//       }
//     });
//   }

//   fetchAuditTypes() {
//     this.scheduleAuditService.getAuditTypes().subscribe({
//       next: (res: any) => {
//         //console.log('Raw audit types response:', res);
//         const data = res ?? [];

//         if (!Array.isArray(data)) {
//           // If it's not an array, check if it has a data property
//           const actualData = res?.data || res?.items || [];
//           if (Array.isArray(actualData)) {
//             this.auditTypes = actualData;
//           } else {
//             this.auditTypes = [];
//             //this.notify.Error('Invalid audit types data format');
//             return;
//           }
//         } else {
//           this.auditTypes = data;
//         }

//         if (this.auditTypes.length === 0) {
//           this.notify.Error('No audit types found');
//         }

//         console.log('Processed audit types:', this.auditTypes);
//       },
//       error: (err: any) => {
//         this.auditTypes = [];
//         this.notify.Error('Failed to fetch audit types');
//         console.error('Error fetching audit types:', err);
//       }
//     });
//   }

//   private buildRequest(): SupplierListRequest {
//     return {
//       search: '',
//       legalStructure: null,
//       primaryIndustry: null,
//       classificationIds: null,
//       naics: null,
//       country: 2,
//       state: null,
//       city: null,
//       fromDate: null,
//       toDate: null,
//       yearEstablished: null,
//       noOfEmployees: { min: 0, max: 1000 },
//       annualRevenue: { min: 0, max: 1000000 },
//       PageNumber: 1,
//       PageSize: 10,
//       isAllApproved: true,
//       isAllUnApproved: false,
//       inactive: false,
//       syncHistoryId: null,
//       epId: null
//     };
//   }

//   fetchSuppliers(): void {
//     const request = this.buildRequest();
//     console.log('Fetching suppliers with request:', request);

//     this.supplierService.getSuppliers(request).subscribe({
//       next: (res: any) => {
//         console.log('Raw suppliers response:', res);
//         const items = res?.data?.paginatedResult?.items ?? [];

//         if (!Array.isArray(items)) {
//           this.suppliers = [];
//           this.notify.Error('Invalid suppliers data format');
//           return;
//         }

//         if (items.length === 0) {
//           this.suppliers = [];
//           this.notify.Error('No suppliers found');
//           return;
//         }

//         this.suppliers = items;
//         console.log('Processed suppliers:', this.suppliers);
//       },
//       error: (err) => {
//         console.error('Failed to load suppliers', err);
//         this.notify.Error('Failed to load suppliers. Please try again later.');
//         this.suppliers = [];
//       }
//     });
//   }

//   private patchAuditData(): void {
//     if (!this.audit) return;

//     this.formData = {
//       auditId: this.audit.auditId || '',
//       date: this.audit.auditDate ? this.audit.auditDate.split("T")[0] : '',
//       time: this.audit.auditDate ? this.formatTime(new Date(this.audit.auditDate)): '',
//       supplier: this.audit.supplierId || '',
//       auditor: this.audit.leadAuditor || '',
//       auditType: this.audit.auditType || '',
//       comment: this.audit.comment || ''
//     };

//     // Also set selected objects for dropdown labels
//     this.selectedSupplier = this.suppliers.find(s => s.companyId === this.audit.supplierId) || null;
//     this.selectedAuditor = this.auditors.find(a => a.auditorId === this.audit.leadAuditor) || null;
//     this.selectedAuditorType = this.auditTypes.find(t => t.auditTypeId === this.audit.auditType) || null;
//   }
// formatTime(date: Date): string {
//   const hours = date.getHours().toString().padStart(2, '0');   // local hours
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   return `${hours}:${minutes}`;
// }

//   // Dropdown toggle methods
//   toggleSupplierDropdown(event?: Event): void {
//     if (event) {
//       event.stopPropagation();
//     }
//     this.supplierDropdownOpen = !this.supplierDropdownOpen;
//     // Close other dropdowns
//     this.auditorDropdownOpen = false;
//     this.auditTypeDropdownOpen = false;
//   }

//   toggleAuditorDropdown(event?: Event): void {
//     if (event) {
//       event.stopPropagation();
//     }
//     this.auditorDropdownOpen = !this.auditorDropdownOpen;
//     // Close other dropdowns
//     this.supplierDropdownOpen = false;
//     this.auditTypeDropdownOpen = false;
//   }

//   toggleAuditTypeDropdown(event?: Event): void {
//     if (event) {
//       event.stopPropagation();
//     }
//     this.auditTypeDropdownOpen = !this.auditTypeDropdownOpen;
//     // Close other dropdowns
//     this.supplierDropdownOpen = false;
//     this.auditorDropdownOpen = false;
//   }

//   // Close all dropdowns
//   closeAllDropdowns(): void {
//     this.supplierDropdownOpen = false;
//     this.auditorDropdownOpen = false;
//     this.auditTypeDropdownOpen = false;
//   }

//   getSelectedSupplierName(): string {
//     if (!this.selectedSupplier) return '';
//     return this.selectedSupplier.companyName;
//   }

//   getSelectedAuditorName(): string {
//     if (!this.selectedAuditor) return '';
//     return this.selectedAuditor.name;
//   }

//   getSelectedAuditorTypeName(): string {
//     if (!this.selectedAuditorType) return '';
//     return this.selectedAuditorType.typeName;
//   }

//   // Event handlers
//   onDateChange(event: Event): void {

//     const target = event.target as HTMLInputElement;
//     this.formData.date = target.value;
//     console.log("FormatDates : ", this.formData.date);

//     if (this.formData.time) {

//       const selectedDateTime = new Date(`${this.formData.date}T${this.formData.time}`);
//       const now = new Date();

//       if (selectedDateTime < now) {
//         this.formData.time = '';
//       }
//     }
//   }

//   onTimeChange(event: Event): void {
//     const target = event.target as HTMLInputElement;
//     this.formData.time = target.value;

//     const today = new Date();
//     const selectedDate = new Date(this.formData.date);

//     const isToday = selectedDate.getFullYear() === today.getFullYear() &&
//       selectedDate.getMonth() === today.getMonth() &&
//       selectedDate.getDate() === today.getDate();

//     if (isToday) {
//       // Parse AM/PM time to 24h Date
//       const [time, modifier] = target.value.split(" "); // "03:15", "PM"
//       let [hours, minutes] = time.split(":").map(Number);

//       if (modifier === "PM" && hours < 12) hours += 12;
//       if (modifier === "AM" && hours === 12) hours = 0;

//       const selectedTime = new Date(selectedDate);
//       selectedTime.setHours(hours, minutes, 0, 0);

//       if (selectedTime < today) {
//         this.istimevalid = false;
//         this.notify.Warning("Please select a valid future time");
//         this.formData.time = '';
//       }
//       else {
//         this.istimevalid = true;
//       }
//     }
//   }

//   onSupplierChange(supplier: any): void {
//     this.selectedSupplier = supplier;
//     this.formData.supplier = supplier.companyId;
//     this.closeAllDropdowns();
//     console.log('Selected supplier:', supplier);
//   }

//   onAuditorChange(auditor: any): void {
//     this.selectedAuditor = auditor;
//     this.formData.auditor = auditor.auditorId;
//     this.closeAllDropdowns();
//     console.log('Selected auditor:', auditor);
//   }

//   onAuditTypeChange(auditType: any): void {
//     this.selectedAuditorType = auditType;
//     this.formData.auditType = auditType.auditTypeId;
//     this.closeAllDropdowns();
//     console.log('Selected audit type:', auditType);
//   }

//   onCommentChange(event: Event): void {
//     const target = event.target as HTMLTextAreaElement;
//     this.formData.comment = target.value;
//   }

//   onCloseModal(): void {
//     this.audit = undefined;
//     this.editMode = false;
//     this.supplierState.clearCurrentSupplier();
//     this.resetForm();
//     this.onClose.emit();
//   }

//   private combineDateTimeToUTC(date: string, time: string): string {
//     if (!date || !time) {
//       return '';
//     }

//     // Create date object treating input as UTC
//     const utcDateTime = new Date(`${date}T${time}:00.000Z`);
//     return utcDateTime.toISOString();
//   }
//   onSubmitForm(): void {
//     if (!this.isFormValid() && !this.istimevalid) {
//       this.notify.Error('Please fill in all required fields');
//       return;
//     }

//     const utcDateTime = this.combineDateTimeToUTC(this.formData.date, this.formData.time);

//     const submissionData = {
//       auditId: this.formData.auditId,
//       supplierId: this.formData.supplier,
//       auditDate: utcDateTime, // e.g. "2025-09-25T06:19:00.000Z"
//       auditType: this.formData.auditType,
//       leadAuditor: this.formData.auditor,
//       score: null,
//       statusId: 1,
//       comment: this.formData.comment
//     };

//     if (this.editMode) {
//       //  Update existing audit
//       this.scheduleAuditService.updateAudit(this.audit.auditId, submissionData).subscribe({
//         next: (res: any) => {
//           if (!res || res.error) {
//             const errorMsg = res?.error?.message || 'Failed to update audit. Please try again later.';
//             this.notify.Error(errorMsg);
//             return;
//           }
//           this.notify.Success('Audit updated successfully');
//           this.onCloseModal();
//         },
//         error: (err: any) => {
//           console.error('Error updating audit:', err);
//           this.notify.Error('Failed to update audit. Please try again later.');
//         }
//       });
//     } else {
//       //  Create new audit
//       this.scheduleAuditService.scheduleAudit(submissionData).subscribe({
//         next: (res: any) => {
//           if (!res || res.error) {
//             const errorMsg = res?.error?.message || 'Failed to schedule audit. Please try again later.';
//             this.notify.Error(errorMsg);
//             return;
//           }
//           this.notify.Success('Audit scheduled successfully');
//           this.onCloseModal();
//         },
//         error: (err: any) => {
//           console.error('Error scheduling audit:', err);
//           this.notify.Error('Failed to schedule audit. Please try again later.');
//         }
//       });
//     }
//   }



//   private isFormValid(): boolean {
//     return !!(this.formData.date && this.formData.time && this.formData.supplier &&
//       this.formData.auditor && this.formData.auditType);
//   }

//   private resetForm(): void {
//     this.formData = {
//       auditId: '',
//       date: '',
//       time: '',
//       supplier: '',
//       auditor: '',
//       auditType: '',
//       comment: ''
//     };
//     this.selectedSupplier = null;
//     this.selectedAuditor = null;
//     this.selectedAuditorType = null;
//     // Close all dropdowns
//     this.closeAllDropdowns();
//   }
// }