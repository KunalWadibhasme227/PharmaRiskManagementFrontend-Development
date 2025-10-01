import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../../ui/card.component';
import { ButtonComponent } from '../../ui/button.component';
import { BadgeComponent } from '../../ui/badge.component';
import { ScrollAreaComponent } from '../../ui/scroll-area.component';
import { SelectComponent, SelectContentComponent, SelectItemComponent, SelectTriggerComponent } from '../../ui/select.component';
import { Router } from '@angular/router';
import { SupplierStateService } from '../../../shared/services/suppliers/supplier-state.service';
import { Location } from '@angular/common';
import { RemainingDurationPipe } from '../../../models/remaining-duration.pipe';

@Component({
  selector: 'app-viewaudits',
  imports: [CommonModule,DashboardHeaderComponent, CardComponent, CardContentComponent, RemainingDurationPipe],
  templateUrl: './viewaudits.html',
  styleUrl: './viewaudits.scss'
})
export class Viewaudits {
audit?: any;

  constructor(private route: Router, 
    private supplierState : SupplierStateService, private location:Location) {}

  ngOnInit(): void {
     this.audit = this.supplierState.getCurrentSupplier();
    console.log("audits- detials",this.audit);
  }
goBack(): void {
    this.location.back();
  }
getFormattedDateTime(isoString: string): string {
  const dateObj = new Date(isoString);

  const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
  const formattedTime = dateObj.toLocaleTimeString('en-US', optionsTime);

  return `${formattedDate} at ${formattedTime}`;
}

getRemainingDuration(isoString: string): string {
  const now = new Date();
  const target = new Date(isoString);

  let diffMs = target.getTime() - now.getTime(); // difference in ms

  if (diffMs <= 0) {
    return 'Expired'; // already passed
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays}d ${diffHours}h ${diffMinutes}m remaining`;
  } else if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m remaining`;
  } else {
    return `${diffMinutes}m remaining`;
  }
}


  
  

}
