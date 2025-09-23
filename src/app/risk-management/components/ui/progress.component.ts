import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container" [class]="className">
      <div 
        class="progress-bar" 
        [style.width.%]="value"
        [class]="getProgressClass()">
      </div>
    </div>
  `,
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  @Input() value: number = 0;
  @Input() className: string = '';

  getProgressClass(): string {
    if (this.value >= 90) return 'progress-high';
    if (this.value >= 75) return 'progress-medium';
    if (this.value >= 50) return 'progress-normal';
    return 'progress-low';
  }
}
