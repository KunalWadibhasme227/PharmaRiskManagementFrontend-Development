import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { Uploaddocument } from '../../shared/services/Uploaddocument/uploaddocument';
import { SupplierListRequest } from '../../models/supplier.model';

@Component({
  selector: 'app-uploaddocumentcomponent',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    NgxMatTimepickerModule,
    MatIconModule
  ],
  templateUrl: './uploaddocumentcomponent.html',
  styleUrls: ['./uploaddocumentcomponent.scss']
})
export class Uploaddocumentcomponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @ViewChild('supplierDropdown', { static: false }) supplierDropdownRef!: ElementRef;
  @ViewChild('auditorDropdown', { static: false }) auditorDropdownRef!: ElementRef;
  @ViewChild('auditTypeDropdown', { static: false }) auditTypeDropdownRef!: ElementRef;
  

  documentForm!: FormGroup;
  Category: any[] = [];
  Audit: any[] = [];
  today: Date = new Date();
  currentDate: string = new Date().toISOString().split('T')[0];
  selectedAuditType: any;
  auditTypeDropdownOpen = false;
  selectedCategoryName: any;
  CategoryNameDropdownOpen = false;
  selectedFile: File | null = null;
  fileError: string | null = null;
  editMode: boolean = false;
  isEdit = false;
  istimevalid: boolean = false;
  existingFilePath: string = '';

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private notify: NotificationService,
    private Service:Uploaddocument,
    public dialogRef: MatDialogRef<Uploaddocumentcomponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) 
  {
    this.createForm();
    this.fetchAuditTypes();
    this.fetchCategoryName();
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0); 
  }

  ngOnInit(): void {
     if (this.data?.id) {
      this.isEdit = true;
      this.patchUploadDocumentData(this.data.id);
    }
  }

  createForm(): void {
    this.documentForm = this.fb.group({
      DocumentId:[''],
      DocumentName: ['', Validators.required],
      CategoryId: ['',Validators.required],
      AuditId: ['', Validators.required],
      Description: [''],
      ExpiryDate: ['', Validators.required],
      CreatedDate: [this.today, Validators.required],
      File: ['']
    });
  }

  
  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private patchUploadDocumentData(id: number): void {
    this.Service.getUploadDocumentById(id).subscribe({
      next: (response: any) => {
        if (response) {
          this.documentForm.patchValue({
            DocumentId: response.documentId || '',
            DocumentName: response.documentName || '',
            CategoryId: response.categoryId || '',
            AuditId: Number(response.auditId) || '',
            Description: response.description || '',
            ExpiryDate: response.expiryDate ? response.expiryDate.split('T')[0] : '',
            CreatedDate: response.createdDate ? response.createdDate.split('T')[0] : '',
            File: response.file || ''
          });
          this.existingFilePath = response.filePath || '';
          console.log("GetById Fetch Success:", response);
        } else {
          this.notify.Error('Document not found');
        }
      },
      error: (err: any) => {
        console.error('Error loading document', err);
        this.notify.Error('Failed to load document');
      }
    });
  }

  get existingFileName(): string {
  if (!this.existingFilePath) return '';
  return this.existingFilePath.split('/').pop() || '';
  }

  dateFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    date.setHours(0, 0, 0, 0); 
    return date >= this.today; 
  };


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this.fileError = 'File size must be less than 5MB';
        this.selectedFile = null;
        return;
      }
      this.selectedFile = file;
      this.documentForm.patchValue({ File: file });
      this.fileError = null;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.documentForm.invalid) {
      this.notify.Error('Please fill in all required fields');
      return;
    }

    const DocumentId = this.documentForm.get('DocumentId')!.value;
    const submissionData = new FormData();

    submissionData.append('DocumentId', DocumentId);
    submissionData.append('DocumentName', this.documentForm.get('DocumentName')!.value);
    submissionData.append('CategoryId', this.documentForm.get('CategoryId')!.value);
    submissionData.append('AuditId', this.documentForm.get('AuditId')!.value);
    submissionData.append('Description', this.documentForm.get('Description')!.value);

    const expiry = this.documentForm.get('ExpiryDate')!.value;
    submissionData.append(
      'ExpiryDate',
      expiry instanceof Date ? expiry.toISOString().split('T')[0] : expiry
    );

    if (this.selectedFile) {
      submissionData.append('File', this.selectedFile);
    }

    if (this.isEdit) {
      this.Service.UpdateUploadDocument(DocumentId, submissionData).subscribe({
        next: (res: any) => {
          if (this.selectedFile)
          this.existingFilePath = res.filePath;
          this.selectedFile = res.filePath; 
          this.dialogRef.close();
          this.notify.Success('Document updated successfully');
        },
        error: () => this.notify.Error('Failed to update Document')
      });
    } else {
      this.Service.InsertUploadDocument(submissionData).subscribe({
        next: () => {
          this.dialogRef.close();
          this.notify.Success('Document uploaded successfully');
        },
        error: () => this.notify.Error('Failed to upload Document')
      });
    }
  }

  fetchCategoryName() {
  this.Service.getCategiores().subscribe({
    next: (res: any) => {
      this.Category = res;
      if (this.Category.length === 0)
        this.notify.Error('No Categories found');
    },
    error: (err: any) => {
      this.Category = [];
      this.notify.Error('Failed to fetch Categories');
      console.error(err);
    }
  });
}

fetchAuditTypes() {
  this.Service.getAuditTypes().subscribe({
    next: (res: any) => {
      this.Audit = res;
       if (this.Audit.length === 0)
        this.notify.Error('No Audit found');
    },
    error: (err: any) => {
      this.Audit = [];
      this.notify.Error('Failed to fetch Audit types');
      console.error(err);
    }
  });
}


// fetchAuditTypes() {
//   this.Service.getAuditTypes().subscribe({
//     next: (res: any) => {
//       this.Audit = res;
//       if (this.Audit.length === 0)
//         this.notify.Error('No audit types found');
//     },
//     error: (err: any) => {
//       this.Audit = [];
//       this.notify.Error('Failed to fetch audit types');
//       console.error(err);
//     }
//   });
// }


  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     if (file.size > 5 * 1024 * 1024) {
  //       this.fileError = 'File size must be less than 5MB';
  //       this.selectedFile = null;
  //       return;
  //     }
  //     this.selectedFile = file;
  //     this.documentForm.patchValue({ File: file });
  //     this.fileError = null;
  //   }
  // }

  

}
