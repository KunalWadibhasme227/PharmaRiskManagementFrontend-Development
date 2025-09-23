import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="scrollAreaClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .scroll-area {
      overflow-y: auto;
      overflow-x: hidden;
    }
    
    .scroll-area::-webkit-scrollbar {
      width: 6px;
    }
    
    .scroll-area::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .scroll-area::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 3px;
    }
    
    .scroll-area::-webkit-scrollbar-thumb:hover {
      background: var(--muted-foreground);
    }
  `]
})
export class ScrollAreaComponent {
  @Input() className: string = '';

  get scrollAreaClasses(): string {
    return `scroll-area ${this.className}`;
  }
}
