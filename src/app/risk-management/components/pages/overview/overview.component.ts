import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, DashboardHeaderComponent],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  title = 'Pharma Risk Management - Overview';
}
