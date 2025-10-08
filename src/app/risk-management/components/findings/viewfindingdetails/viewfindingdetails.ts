import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Findingservice } from '../../../services/Findings/findingservice';
import { ActivatedRoute } from '@angular/router';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';
import { ButtonComponent } from '../../ui/button.component';
import { BadgeComponent } from '../../ui/badge.component';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';


@Component({
  selector: 'app-viewfindingdetails',
  imports: [CommonModule, CardComponent,
      CardContentComponent, DashboardHeaderComponent, BadgeComponent
    ],
  templateUrl: './viewfindingdetails.html',
  styleUrl: './viewfindingdetails.scss'
})
export class Viewfindingdetails {

  assignees: any[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 1, name: 'Jonny Smith' },
    { id: 2, name: 'Jems Joe' }
  ];
  finding : any;

  constructor(private location: Location, private findingservice: Findingservice, private route : ActivatedRoute) { }

  ngOnInit(): void {
    const Id = this.route.snapshot.paramMap.get('id');
    if (Id) 
    {
      this.GetFindingDetails(Id);
    }
  }


  goBack(): void {
    this.location.back();
  }

  GetFindingDetails(Id: string) {
    this.findingservice.getfindingsById(Id).subscribe({
      next: (response: any) => {
        console.log("Finding Response : ",response);
        this.finding = response;
      },
      error: (err: any) => {
        console.error('Error adding finding', err);
      }
    });
  }

  getCategoryBadgeText(category: any): string {
    switch (category) {
      case 1:
        return "Critical";
      case 2:
        return "Major";
      case 3:
        return "Minor";
      default:
        return "";
    }
  }

  getStatusBadgeText(status: any): string {
    switch (status) {
      case 1:
        return "Open";
      case 2:
        return "Overdue";
      case 3:
        return "Closed";
      default:
        return "";
    }
  }

  getAssigneeName(id: number): string {
    const assignee = this.assignees.find(a => a.id === id);
    return assignee ? assignee.name : 'Unknown';
  }

  getStatusBadgeVariant(status: any): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (status) {
      case 1:
        return "outline";
      case 2:
        return "destructive";
      case 3:
        return "primary";
      default:
        return "default";
    }
  }

   getCategoryBadgeVariant(category: any): "default" | "secondary" | "destructive" | "outline" | "primary" | "accent" {
    switch (category) {
      case 1:
        return "destructive";
      case 2:
        return "accent";
      case 3:
        return "primary";
      default:
        return "default";
    }
  }

}
