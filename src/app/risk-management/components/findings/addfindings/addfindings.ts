import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Findingservice } from '../../../services/Findings/findingservice';
import { Observable } from 'rxjs';
import { ScheduleAuditService } from '../../../shared/services/scheduleaudit/schedule-audit.service';
import { AuditRequestDto } from '../../../models/supplier.model';
import { NotificationService } from '../../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-addfindings',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './addfindings.html',
  styleUrl: './addfindings.scss'
})
export class Addfindings {
  auditForm: FormGroup;

  // Example dropdown data (you’ll fetch these from API normally)
  audits: any[] = [
  { id: 1, name: 'Audit A' },
  { id: 2, name: 'Audit B' }
];


  categories: any[] = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Operations' }
  ];

  assignees: any[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  currentdate: string = new Date().toISOString();
  constructor(
    private fb: FormBuilder, private findingservice : Findingservice, private scheduleauditservice : ScheduleAuditService,
    public dialogRef: MatDialogRef<Addfindings>,
    @Inject(MAT_DIALOG_DATA) public data: any, private notify : NotificationService
  ) {
    this.auditForm = this.fb.group({
      title: ['', Validators.required],
      auditId: [null, Validators.required],
      categoryId: [null, Validators.required],
      dueDate: [null, Validators.required],
      assigneeId: [null, Validators.required],
      tagId :[1],
      statusId:[1],
      progressPercent:[0],
      description: ['']
    });

    this.getAudit();
  }

  private buildAuditRequestDto(): AuditRequestDto {
      return { statusId: 0, searchText: '', pageNumber: 1, pageSize: 10000 };
    }
  
  getAudit()
  {
    const filter = this.buildAuditRequestDto();
    this.scheduleauditservice.getScheduledAudits(filter).subscribe({
      next:(response : any) =>{
        if(response)
        {
          this.audits = response.records;
        }
        else{
          this.audits= [];
        }
      },
      error: (err : any) => {
        console.error('Error fetching Audits', err);
      }
    })
  }

  onSubmit() {
  if (this.auditForm.valid) {
    console.log("AuditForm : ",this.auditForm.value);
    this.findingservice.Addfindings(this.auditForm.value).subscribe({
      next: (response : any) => {
        this.notify.Success("Findings Added Successfully");
        this.dialogRef.close(this.auditForm.value);
      },
      error: (err : any) => {
        console.error('Error adding finding', err);
        // Optionally show an error message to the user
      }
    });
  } else {
    // Mark all controls as touched to show validation errors
    this.auditForm.markAllAsTouched();
  }
}


  onCancel() {
    this.dialogRef.close();
  }
}
