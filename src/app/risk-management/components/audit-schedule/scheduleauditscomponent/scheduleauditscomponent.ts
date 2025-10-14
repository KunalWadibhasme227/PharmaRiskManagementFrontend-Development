import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../ui/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../ui/button.component';
import { InputComponent } from '../../ui/input.component';
import { TextareaComponent } from '../../ui/textarea.component';
import { SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent } from '../../ui/select.component';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierStateService } from '../../../shared/services/suppliers/supplier-state.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { ScheduleAuditService } from '../../../shared/services/scheduleaudit/schedule-audit.service';
import { SupplierListRequest } from '../../../models/supplier.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { DatePipe } from '@angular/common';
export interface ScheduleAuditFormData {
  auditId: string;
  auditTitle: string;
  date: string;
  time: string;
  supplier: string;
  auditor: string;
  auditType: string;
  comment: string;
}

@Component({
  selector: 'app-scheduleauditscomponent',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    SelectTriggerComponent,
    SelectContentComponent, MatInputModule,
    SelectItemComponent, NgxMatTimepickerModule,
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './scheduleauditscomponent.html',
  styleUrls: ['./scheduleauditscomponent.scss']
})
export class Scheduleauditscomponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  //@Output() onSubmit = new EventEmitter<ScheduleAuditFormData>();

  @ViewChild('supplierDropdown', { static: false }) supplierDropdownRef!: ElementRef;
  @ViewChild('auditorDropdown', { static: false }) auditorDropdownRef!: ElementRef;
  @ViewChild('auditTypeDropdown', { static: false }) auditTypeDropdownRef!: ElementRef;
  @ViewChild('timepicker') timePicker!: any;

  scheduleForm!: FormGroup;

  auditors: any[] = [];
  auditTypes: any[] = [];
  suppliers: any[] = [];
  audits: any[] = []
  today: Date = new Date();
  currentDate: string = new Date().toISOString().split('T')[0];
  audit?: any;
  editMode: boolean = false;

  selectedSupplier: any = null;
  selectedAuditor: any = null;
  selectedAuditType: any;

  supplierDropdownOpen = false;
  auditorDropdownOpen = false;
  auditTypeDropdownOpen = false;
  isEdit = false;
  istimevalid: boolean = false;


  constructor(
    private fb: FormBuilder,
    private scheduleAuditService: ScheduleAuditService,
    private notify: NotificationService,
    private supplierService: SupplierService,
    private supplierState: SupplierStateService, public dialogRef: MatDialogRef<Scheduleauditscomponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.fetchAuditors();
    this.fetchSuppliers();
    this.fetchAuditTypes();
  }
  ngOnInit() {
    if (this.data?.id) {
      this.isEdit = true;
      this.patchAuditData(this.data.id);
    }
  }

  // ✅ Initialize Reactive Form
  createForm() {
    this.scheduleForm = this.fb.group({
      auditId: [''],
      auditTitle: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      supplier: ['', Validators.required],
      auditor: ['', Validators.required],
      auditType: ['', Validators.required],
      comment: ['']
    });
  }

  // ngOnChanges(): void {
  //   this.audit = this.supplierState.getCurrentSupplier();
  //   if (this.audit) {
  //     this.editMode = true;
  //     this.patchAuditData();
  //   }
  // }

  private patchAuditData(Id: string): void {

    this.scheduleAuditService.getAuditById(Id).subscribe({
      next: (response: any) => {
        if (response) {
          this.scheduleForm.patchValue({
            auditId: response.auditId || '',
            auditTitle: response.auditTitle || '',
            date: response.auditDate ? response.auditDate.split('T')[0] : '',
            time: response.auditDate ? this.formatTime(new Date(response.auditDate)) : '',
            supplier: response.supplierId || '',
            auditor: response.leadAuditor || '',
            auditType: response.auditType || '',
            comment: response.comment || ''
          });
        }else {
          this.notify?.Success('Finding not found');
        }
      },
      error: (err: any) => {
        // this.isLoading = false;
        console.error('Error loading finding', err);
        this.notify?.Success('Failed to load finding');
      }
    });
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // private combineDateTimeToUTC(date: Date, time: string): string {
  //   if (!date || !time) return '';

  //   // Extract hours and minutes from "3:00 PM"
  //   const [timePart, modifier] = time.split(' ');
  //   let [hours, minutes] = timePart.split(':').map(Number);

  //   if (modifier === 'PM' && hours < 12) hours += 12;
  //   if (modifier === 'AM' && hours === 12) hours = 0;

  //   // Combine into a new Date object
  //   const combined = new Date(date);
  //   combined.setHours(hours, minutes, 0, 0);

  //   // Convert to UTC ISO string
  //   return combined.toISOString();
  // }

  private combineDateTimeToUTC(date: Date, time: string): string {
  if (!date || !time) return '';
 
  // Extract hours and minutes from "3:00 PM"
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
 
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
 
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
 
  // ✅ Return formatted local date-time without converting to UTC
  const year = combined.getFullYear();
  const month = String(combined.getMonth() + 1).padStart(2, '0');
  const day = String(combined.getDate()).padStart(2, '0');
  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
 
  return `${year}-${month}-${day}T${hh}:${mm}:00`; // no "Z" suffix
 }


  onCancel() {
    this.dialogRef.close();
  }
 
  onSubmit(): void {
    console.log("Audit details : ", this.scheduleForm.value);
    if (this.scheduleForm.invalid && !this.istimevalid) {
      this.notify.Error('Please fill in all required fields');
      return;
    }

    const { auditId, auditTitle, date, time, supplier, auditor, auditType, comment } = this.scheduleForm.value;
    const utcDateTime = this.combineDateTimeToUTC(date, time);

    const submissionData = {
      auditId,
      auditTitle,
      supplierId: supplier,
      auditDate: utcDateTime,
      auditType,
      leadAuditor: auditor,
      score: null,
      statusId: 1,
      comment
    };
    console.log("SubmissionData : ", submissionData);

    if (this.isEdit) {
      this.scheduleAuditService.updateAudit(auditId, submissionData).subscribe({
        next: () => {
          this.dialogRef.close();
          this.notify.Success('Audit updated successfully');

        },
        error: () => this.notify.Error('Failed to update audit')
      });
    } else {
      this.scheduleAuditService.scheduleAudit(submissionData).subscribe({
        next: () => {
          this.dialogRef.close();
          this.notify.Success('Audit scheduled successfully');
        },
        error: () => this.notify.Error('Failed to schedule audit')
      });
    }
  }

  // ✅ Supplier / Auditor / Audit Type Fetching Logic
  private buildRequest(): SupplierListRequest {
    return {
      search: '',
      legalStructure: null,
      primaryIndustry: null,
      classificationIds: null,
      naics: null,
      country: 2,
      state: null,
      city: null,
      fromDate: null,
      toDate: null,
      yearEstablished: null,
      noOfEmployees: { min: 0, max: 1000 },
      annualRevenue: { min: 0, max: 1000000 },
      PageNumber: 1,
      PageSize: 10,
      isAllApproved: true,
      isAllUnApproved: false,
      inactive: false,
      syncHistoryId: null,
      epId: null
    };
  }

  fetchAuditors() {
    this.scheduleAuditService.getAuditors().subscribe({
      next: (res: any) => {
        const data = Array.isArray(res) ? res : res?.data || res?.items || [];
        this.auditors = Array.isArray(data) ? data : [];
        if (this.auditors.length === 0) this.notify.Error('No auditors found');
      },
      error: (err: any) => {
        this.auditors = [];
        this.notify.Error('Failed to fetch auditors');
        console.error(err);
      }
    });
  }

  fetchAuditTypes() {
    this.scheduleAuditService.getAuditTypes().subscribe({
      next: (res: any) => {
        this.auditTypes = res;
        if (this.auditTypes.length === 0) this.notify.Error('No audit types found');
      },
      error: (err: any) => {
        this.auditTypes = [];
        this.notify.Error('Failed to fetch audit types');
        console.error(err);
      }
    });
  }

  fetchSuppliers() {
    const request = this.buildRequest();
    this.supplierService.getSuppliers(request).subscribe({
      next: (res: any) => {
        const items = res?.data?.paginatedResult?.items ?? [];
        this.suppliers = items;
        if (this.suppliers.length === 0) this.notify.Error('No suppliers found');
      },
      error: (err) => {
        this.suppliers = [];
        this.notify.Error('Failed to load suppliers');
        console.error(err);
      }
    });
  }

  
  onTimeChange(event: any): void {
  let selectedTimeStr: string = '';

  // Get time from event (depends on ngx-mat-timepicker version)
  if (typeof event === 'string') {
    selectedTimeStr = event;
  } else if (event?.value) {
    selectedTimeStr = event.value;
  } else {
    return;
  }
  

  const datePipe = new DatePipe('en-US');
  const formattedTime = datePipe.transform(new Date(`1970-01-01 ${selectedTimeStr}`), 'HH:mm');
  this.scheduleForm.patchValue({ time: formattedTime });

  const selectedDate = new Date(this.scheduleForm.value.date);
  const today = new Date();

  if (!formattedTime || !selectedDate) {
    this.istimevalid = true;
    return;
  }

  // Check if selected date is today
  const isToday = selectedDate.toDateString() === today.toDateString();

  // Parse hours & minutes
  let [hours, minutes] = formattedTime.split(':').map(Number);

  const selectedDateTime = new Date(selectedDate);
  selectedDateTime.setHours(hours, minutes, 0, 0);

  if (isToday && selectedDateTime < today) {
    this.istimevalid = false;
    this.notify.Warning('You cannot select a past time for today.');
    
    // Reset field safely
    this.scheduleForm.get('time')?.setValue(null, { emitEvent: false });
    setTimeout(() => this.timePicker.open(), 0); // optional: reopen timepicker
  } else {
    this.istimevalid = true;
  }
}




//#region utility function

convertTo24Hour(time12h: string): string | null {
  // Parse time with today's date just to use DatePipe
  const datePipe = new DatePipe('en-US');
  const date = new Date(`1970-01-01 ${time12h}`);
  return datePipe.transform(date, 'HH:mm'); // returns 'HH:mm' 24-hour format
}

//#endregion


dateChange(e:any){
 if(this.timePicker.defaultTime) this.onTimeChange(this.timePicker.defaultTime)
}



  //  onTimeChange(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   this.scheduleForm.value.time = target.value;

  //   const today = new Date();
  //   const selectedDate = new Date(this.scheduleForm.value.date);

  //   const isToday = selectedDate.getFullYear() === today.getFullYear() &&
  //     selectedDate.getMonth() === today.getMonth() &&
  //     selectedDate.getDate() === today.getDate();

  //   if (isToday) {
  //     // Parse AM/PM time to 24h Date
  //     const [time, modifier] = target.value.split(" "); // "03:15", "PM"
  //     let [hours, minutes] = time.split(":").map(Number);

  //     if (modifier === "PM" && hours < 12) hours += 12;
  //     if (modifier === "AM" && hours === 12) hours = 0;

  //     const selectedTime = new Date(selectedDate);
  //     selectedTime.setHours(hours, minutes, 0, 0);

  //     if (selectedTime < today) {
  //       this.istimevalid = false;
  //       this.notify.Warning("Please select a valid future time");
  //       this.scheduleForm.value.time = '';
  //     }
  //     else {
  //       this.istimevalid = true;
  //     }
  //   }
  //}
}

// import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ModalComponent } from '../../ui/modal.component';
// import { ButtonComponent } from '../../ui/button.component';
// import { InputComponent } from '../../ui/input.component';
// import { TextareaComponent } from '../../ui/textarea.component';
// import { SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent } from '../../ui/select.component';
// import { SupplierService } from '../../../services/supplier.service';
// import { SupplierStateService } from '../../../shared/services/suppliers/supplier-state.service';
// import { NotificationService } from '../../../../shared/services/notification/notification.service';
// import { ScheduleAuditService } from '../../../shared/services/scheduleaudit/schedule-audit.service';
// import { SupplierListRequest } from '../../../models/supplier.model';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


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
//   selector: 'app-scheduleauditscomponent',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     ModalComponent,
//     ButtonComponent,
//     InputComponent,
//     TextareaComponent,
//     SelectComponent,
//     SelectTriggerComponent,
//     SelectContentComponent,
//     SelectItemComponent
//   ],
//   templateUrl: './scheduleauditscomponent.html',
//   styleUrl: './scheduleauditscomponent.scss'
// })

// export class Scheduleauditscomponent {
//   @Input() isOpen: boolean = false;
//   @Output() onClose = new EventEmitter<void>();
//   @Output() onSubmit = new EventEmitter<any>();

//   @ViewChild('supplierDropdown', { static: false }) supplierDropdownRef!: ElementRef;
//   @ViewChild('auditorDropdown', { static: false }) auditorDropdownRef!: ElementRef;
//   @ViewChild('auditTypeDropdown', { static: false }) auditTypeDropdownRef!: ElementRef;

//   form!: FormGroup;

//   auditors: any[] = [];
//   auditTypes: any[] = [];
//   suppliers: any[] = [];

//   currentdate: string = new Date().toISOString().split('T')[0];
//   audit?: any;
//   editMode: boolean = false;
//   istimevalid: boolean = false;

//   selectedSupplier: any = null;
//   selectedAuditor: any = null;
//   selectedAuditorType: any;

//   supplierDropdownOpen = false;
//   auditorDropdownOpen = false;
//   auditTypeDropdownOpen = false;

//   constructor(
//     private fb: FormBuilder,
//     private scheduleAuditService: ScheduleAuditService,
//     private notify: NotificationService,
//     private supplierService: SupplierService,
//     private supplierState: SupplierStateService
//   ) {
//     this.createForm();
//     this.fetchAuditors();
//     this.fetchSuppliers();
//     this.fetchAuditTypes();
//   }

//   // ✅ Initialize the Reactive Form
//   createForm() {
//     this.form = this.fb.group({
//       auditId: [''],
//       date: ['', Validators.required],
//       time: ['', Validators.required],
//       supplier: ['', Validators.required],
//       auditor: ['', Validators.required],
//       auditType: ['', Validators.required],
//       comment: ['']
//     });
//   }

//   ngOnChanges(): void {
//     this.audit = this.supplierState.getCurrentSupplier();
//     if (this.audit) {
//       this.editMode = true;
//       this.patchAuditData();
//     }
//   }

//   // ✅ Patch existing audit values into reactive form
//   private patchAuditData(): void {
//     if (!this.audit) return;

//     this.form.patchValue({
//       auditId: this.audit.auditId || '',
//       date: this.audit.auditDate ? this.audit.auditDate.split('T')[0] : '',
//       time: this.audit.auditDate ? this.formatTime(new Date(this.audit.auditDate)) : '',
//       supplier: this.audit.supplierId || '',
//       auditor: this.audit.leadAuditor || '',
//       auditType: this.audit.auditType || '',
//       comment: this.audit.comment || ''
//     });

//     this.selectedSupplier = this.suppliers.find(s => s.companyId === this.audit.supplierId) || null;
//     this.selectedAuditor = this.auditors.find(a => a.auditorId === this.audit.leadAuditor) || null;
//     this.selectedAuditorType = this.auditTypes.find(t => t.auditTypeId === this.audit.auditType) || null;
//   }

//   formatTime(date: Date): string {
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     return `${hours}:${minutes}`;
//   }

//   // ✅ Dropdown Handlers
//   toggleSupplierDropdown(event?: Event): void {
//     if (event) event.stopPropagation();
//     this.supplierDropdownOpen = !this.supplierDropdownOpen;
//     this.auditorDropdownOpen = false;
//     this.auditTypeDropdownOpen = false;
//   }

//   toggleAuditorDropdown(event?: Event): void {
//     if (event) event.stopPropagation();
//     this.auditorDropdownOpen = !this.auditorDropdownOpen;
//     this.supplierDropdownOpen = false;
//     this.auditTypeDropdownOpen = false;
//   }

//   toggleAuditTypeDropdown(event?: Event): void {
//     if (event) event.stopPropagation();
//     this.auditTypeDropdownOpen = !this.auditTypeDropdownOpen;
//     this.supplierDropdownOpen = false;
//     this.auditorDropdownOpen = false;
//   }

//   onSupplierChange(supplier: any): void {
//     this.selectedSupplier = supplier;
//     this.form.patchValue({ supplier: supplier.companyId });
//     this.closeAllDropdowns();
//   }

//   onAuditorChange(auditor: any): void {
//     this.selectedAuditor = auditor;
//     this.form.patchValue({ auditor: auditor.auditorId });
//     this.closeAllDropdowns();
//   }

//   onAuditTypeChange(auditType: any): void {
//     this.selectedAuditorType = auditType;
//     this.form.patchValue({ auditType: auditType.auditTypeId });
//     this.closeAllDropdowns();
//   }

//   closeAllDropdowns(): void {
//     this.supplierDropdownOpen = false;
//     this.auditorDropdownOpen = false;
//     this.auditTypeDropdownOpen = false;
//   }

//   onCloseModal(): void {
//     this.audit = undefined;
//     this.editMode = false;
//     this.supplierState.clearCurrentSupplier();
//     this.form.reset();
//     this.onClose.emit();
//   }

//   // ✅ Combine date + time
//   private combineDateTimeToUTC(date: string, time: string): string {
//     if (!date || !time) return '';
//     return new Date(`${date}T${time}:00.000Z`).toISOString();
//   }

//   // ✅ Submit reactive form
//   onSubmitForm(): void {
//     if (this.form.invalid) {
//       this.notify.Error('Please fill in all required fields');
//       return;
//     }

//     const { auditId, date, time, supplier, auditor, auditType, comment } = this.form.value;
//     const utcDateTime = this.combineDateTimeToUTC(date, time);

//     const submissionData = {
//       auditId,
//       supplierId: supplier,
//       auditDate: utcDateTime,
//       auditType,
//       leadAuditor: auditor,
//       score: null,
//       statusId: 1,
//       comment
//     };

//     if (this.editMode) {
//       this.scheduleAuditService.updateAudit(auditId, submissionData).subscribe({
//         next: () => {
//           this.notify.Success('Audit updated successfully');
//           this.onCloseModal();
//         },
//         error: () => this.notify.Error('Failed to update audit')
//       });
//     } else {
//       this.scheduleAuditService.scheduleAudit(submissionData).subscribe({
//         next: () => {
//           this.notify.Success('Audit scheduled successfully');
//           this.onCloseModal();
//         },
//         error: () => this.notify.Error('Failed to schedule audit')
//       });
//     }
//   }


//    private buildRequest(): SupplierListRequest {
//       return {
//         search: '',
//         legalStructure: null,
//         primaryIndustry: null,
//         classificationIds: null,
//         naics: null,
//         country: 2,
//         state: null,
//         city: null,
//         fromDate: null,
//         toDate: null,
//         yearEstablished: null,
//         noOfEmployees: { min: 0, max: 1000 },
//         annualRevenue: { min: 0, max: 1000000 },
//         PageNumber: 1,
//         PageSize: 10,
//         isAllApproved: true,
//         isAllUnApproved: false,
//         inactive: false,
//         syncHistoryId: null,
//         epId: null
//       };
//     }


//   fetchAuditors() { 
//     this.scheduleAuditService.getAuditors().subscribe({
//         next: (res: any) => {
//           console.log('Raw auditors response:', res);
//           const data = res ?? [];

//           if (!Array.isArray(data)) {
//             // If it's not an array, check if it has a data property
//             const actualData = res?.data || res?.items || [];
//             if (Array.isArray(actualData)) {
//               this.auditors = actualData;
//             } else {
//               this.auditors = [];
//               this.notify.Error('Invalid auditors data format');
//               return;
//             }
//           } else {
//             this.auditors = data;
//           }

//           if (this.auditors.length === 0) {
//             this.notify.Error('No auditors found');
//           }

//           console.log('Processed auditors:', this.auditors);
//         },
//         error: (err: any) => {
//           this.auditors = [];
//           this.notify.Error('Failed to fetch auditors');
//           console.error('Error fetching auditors:', err);
//         }
//       }); 
//     }


//   fetchAuditTypes() { 
//     this.scheduleAuditService.getAuditTypes().subscribe({
//         next: (res: any) => {
//           //console.log('Raw audit types response:', res);
//           const data = res ?? [];

//           if (!Array.isArray(data)) {
//             // If it's not an array, check if it has a data property
//             const actualData = res?.data || res?.items || [];
//             if (Array.isArray(actualData)) {
//               this.auditTypes = actualData;
//             } else {
//               this.auditTypes = [];
//               //this.notify.Error('Invalid audit types data format');
//               return;
//             }
//           } else {
//             this.auditTypes = data;
//           }

//           if (this.auditTypes.length === 0) {
//             this.notify.Error('No audit types found');
//           }

//           console.log('Processed audit types:', this.auditTypes);
//         },
//         error: (err: any) => {
//           this.auditTypes = [];
//           this.notify.Error('Failed to fetch audit types');
//           console.error('Error fetching audit types:', err);
//         }
//       }); 
//     }

//   fetchSuppliers() { 

//     const request = this.buildRequest();
//       console.log('Fetching suppliers with request:', request);

//       this.supplierService.getSuppliers(request).subscribe({
//         next: (res: any) => {
//           console.log('Raw suppliers response:', res);
//           const items = res?.data?.paginatedResult?.items ?? [];

//           if (!Array.isArray(items)) {
//             this.suppliers = [];
//             this.notify.Error('Invalid suppliers data format');
//             return;
//           }

//           if (items.length === 0) {
//             this.suppliers = [];
//             this.notify.Error('No suppliers found');
//             return;
//           }

//           this.suppliers = items;
//           console.log('Processed suppliers:', this.suppliers);
//         },
//         error: (err) => {
//           console.error('Failed to load suppliers', err);
//           this.notify.Error('Failed to load suppliers. Please try again later.');
//           this.suppliers = [];
//         }
//       });

//     }
// }


