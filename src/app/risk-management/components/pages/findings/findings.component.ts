import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard-header/dashboard-header.component';
import { FindingsStatsComponent } from '../../findings/findings-stats.component';
import { FindingsListComponent } from '../../findings/findings-list.component';
import { ButtonComponent } from '../../ui/button.component';
import { Addfindings } from '../../findings/addfindings/addfindings';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-findings',
  standalone: true,
  imports: [
    CommonModule,  DashboardHeaderComponent, FindingsStatsComponent, FindingsListComponent, ButtonComponent
  ],
  templateUrl: './findings.component.html',
  styleUrls: ['./findings.component.scss']
})
export class FindingsComponent implements OnInit {

  @ViewChild(FindingsListComponent) findingsList!: FindingsListComponent;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Component initialization
  }
  openForm() {
    const dialogRef = this.dialog.open(Addfindings, {
      width: '800px',
      panelClass: 'audit-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.findingsList.getFindingList('open');
        console.log('Audit Form Submitted:', result);
        // send result to backend via service
      }
    });
  }
}
