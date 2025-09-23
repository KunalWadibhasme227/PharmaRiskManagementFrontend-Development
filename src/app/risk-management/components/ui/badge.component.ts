import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="badgeClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .badge {
      display: inline-flex;
      align-items: center;
      border-radius: 9999px;
      border: 1px solid transparent;
      padding: 0.25rem 0.625rem;
      font-size: 0.75rem;
      font-weight: 600;
      transition: all 0.2s ease;
      outline: none;
    }
    
    .badge-default {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }
    
    .badge-primary {
      background-color: color-mix(in srgb, var(--primary) 10%, transparent);
      color: var(--primary);
      border-color: color-mix(in srgb, var(--primary) 30%, transparent);
    }
    
    .badge-secondary {
      background-color: var(--secondary);
      color: var(--secondary-foreground);
    }
    
    .badge-destructive {
      background-color: color-mix(in srgb, var(--destructive) 10%, transparent);
      color: var(--destructive);
      border-color: color-mix(in srgb, var(--destructive) 30%, transparent);
    }
    
    .badge-accent {
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
      color: var(--accent);
      border-color: color-mix(in srgb, var(--accent) 30%, transparent);
    }
    
    .badge-outline {
      background-color: transparent;
      color: var(--foreground);
      border-color: var(--border);
    }
  `]
})
export class BadgeComponent {
  @Input() variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'primary' | 'accent' = 'default';
  @Input() className: string = '';

  get badgeClasses(): string {
    const baseClasses = 'badge';
    const variantClass = `badge-${this.variant}`;
    
    return `${baseClasses} ${variantClass} ${this.className}`;
  }
}
