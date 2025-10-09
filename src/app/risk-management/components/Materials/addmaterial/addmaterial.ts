import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { MaterialService } from '../../../services/Materials/material-service';
import { SupplierListRequest } from '../../../models/supplier.model';
import { SupplierService } from '../../../services/supplier.service';

export enum CategoryCode {
  API = 1,
  Excipient = 2,
  Packaging = 3
}

export enum StatusCode {
  Active = 1,
  Quarantined = 2,
  Rejected = 3
}

@Component({
  selector: 'app-addmaterial',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule
  ],
  templateUrl: './addmaterial.html',
  styleUrl: './addmaterial.scss'
})

export class Addmaterial {

  materialForm: FormGroup;
  isEdit = false;

  categoryCodes = [
    { label: 'API', value: CategoryCode.API },
    { label: 'Excipient', value: CategoryCode.Excipient },
    { label: 'Packaging', value: CategoryCode.Packaging }
  ];

  statusCodes = [
    { label: 'Active', value: StatusCode.Active },
    { label: 'Quarantined', value: StatusCode.Quarantined },
    { label: 'Rejected', value: StatusCode.Rejected }
  ];

  suppliers : any[] = [];
  minDate: string = new Date().toISOString().split('T')[0]; // "2025-09-25"

  constructor(
    private fb: FormBuilder, private materialService: MaterialService, private notify: NotificationService,
    public dialogRef: MatDialogRef<Addmaterial>, @Inject(MAT_DIALOG_DATA) public data: any,  private supplierService : SupplierService
  ) {
    this.materialForm = this.fb.group({
      materialId: ['00000000-0000-0000-0000-000000000000'],
      materialName: ['', Validators.required],
      categoryCodeId: [null, Validators.required],
      supplierId: [null, Validators.required],
      batchNumber: [''],
      statusCodeId: [null, Validators.required],
      expiryDate: [null, Validators.required],
      manufacturingDate: [null, Validators.required],
      requiredTemp: [''],
      requiredHumidity: ['']
    });
  }

  ngOnInit() {
    if (this.data?.id) {
      this.isEdit = true;
      this.loadMaterial(this.data.id);
    }
    this.fetchSuppliers();
  }

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

  fetchSuppliers(): void {
    const request = this.buildRequest();
    console.log('Fetching suppliers with request:', request);

    this.supplierService.getSuppliers(request).subscribe({
      next: (res: any) => {
        console.log('Raw suppliers response:', res);
        const items = res?.data?.paginatedResult?.items ?? [];

        if (!Array.isArray(items)) {
          this.suppliers = [];
          this.notify.Error('Invalid suppliers data format');
          return;
        }

        if (items.length === 0) {
          this.suppliers = [];
          this.notify.Error('No suppliers found');
          return;
        }

        this.suppliers = items;
        console.log('Processed suppliers:', this.suppliers);
      },
      error: (err) => {
        console.error('Failed to load suppliers', err);
        this.notify.Error('Failed to load suppliers. Please try again later.');
        this.suppliers = [];
      }
    });
  }


  loadMaterial(id: string) {
    // this.materialService.getById(id).subscribe({
    //   next: (res: any) => {
    //     if (res) this.materialForm.patchValue(res);
    //   },
    //   error: (err : any) => {
    //     console.error('Error fetching material', err);
    //     this.notify.Error('Failed to load material');
    //   }
    // });
  }

  onSubmit() {
    if (this.materialForm.invalid) {
      this.materialForm.markAllAsTouched();
      return;
    }

    const formValue = this.materialForm.value;
     if (this.isEdit) {
       this.materialService.update(formValue, formValue.materialId).subscribe({
         next: (res : any) => {
          if(res.StatusCode == 200){
            this.notify.Success('Material updated successfully');
           this.dialogRef.close(formValue);
          }
          else{
            this.notify.Error("Error While Updating Material");
          }
         },
         error: (err : any) => console.error('Error updating material', err)
       });
     } else {
       this.materialService.add(formValue).subscribe({
         next: (res) => {
          if(res.StatusCode == 200)
          {
            this.notify.Success('Material added successfully');
           this.dialogRef.close(formValue);
          }
          else{
            this.notify.Error("Error While Adding Material");
          }
         },
         error: (err : any) => console.error('Error adding material', err)
       });
     }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
