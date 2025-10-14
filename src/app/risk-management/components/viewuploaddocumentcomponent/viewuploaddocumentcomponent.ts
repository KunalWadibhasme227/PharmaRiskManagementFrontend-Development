import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { Uploaddocument } from '../../shared/services/Uploaddocument/uploaddocument';
import { RemainingDurationPipe } from '../../models/remaining-duration.pipe';
import { CardComponent, CardContentComponent } from '../ui/card.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-viewuploaddocumentcomponent',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DashboardHeaderComponent,  
    CardComponent,             
    CardContentComponent,      
    RemainingDurationPipe      
  ],
  templateUrl: './viewuploaddocumentcomponent.html',
  styleUrls: ['./viewuploaddocumentcomponent.scss']
})
export class Viewuploaddocumentcomponent {
  documentDetails?: any;

  constructor(
    private router: Router,
    private route : ActivatedRoute ,
    private service: Uploaddocument,
    private location: Location
  ) {}

 ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.GetFindingDetails(+id); // convert to number
    }
  }
  

  GetFindingDetails(documentId: any) {
      this.service.DetailsUploadDocument(documentId).subscribe({
        next: (response: any) => {
          console.log("Document Details: : ",response);
          this.documentDetails = response;
        },
        error: (err: any) => {
          console.error('Error fetching document details', err);
        }
      });
    }
  
  goBack() {
    this.location.back();
  }
}
