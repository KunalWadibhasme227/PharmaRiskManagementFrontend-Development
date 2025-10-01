import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClasses"
      [disabled]="disabled"
      (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
      outline: none;
    }
    
    .btn:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
    
    .btn:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    
    .btn-default {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }
    
    .btn-default:hover {
      background-color: color-mix(in srgb, var(--primary) 90%, transparent);
    }
    
    .btn-ghost {
      background: transparent;
    }
    
    .btn-ghost:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
    
    .btn-destructive {
      background-color: var(--destructive);
      color: var(--destructive-foreground);
    }
    
    .btn-destructive:hover {
      background-color: color-mix(in srgb, var(--destructive) 90%, transparent);
    }
    
    .btn-outline {
      border: 1px solid var(--border);
      background-color: var(--background);
    }
    
    .btn-outline:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
    
    .btn-secondary {
      background-color: var(--secondary);
      color: var(--secondary-foreground);
    }
    
    .btn-secondary:hover {
      background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
    }
    
    .btn-default {
      height: 2.5rem;
      padding: 0.5rem 1rem;
    }
    
    .btn-sm {
      height: 2.25rem;
      padding: 0.5rem 0.75rem;
    }
    
    .btn-lg {
      height: 2.75rem;
      padding: 0.5rem 2rem;
    }
    
    .btn-cancel {
       background-color: grey; 
       color: white;   
    }

    .btn-cancel:hover {
     background-color: darkgrey; 
    }
    
    .btn-icon {
      height: 2.5rem;
      width: 2.5rem;
      padding: 0;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'default' | 'ghost' | 'destructive' | 'outline' | 'secondary' = 'default';
  @Input() size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    const baseClasses = 'btn';
    const variantClass = `btn-${this.variant}`;
    const sizeClass = `btn-${this.size}`;
    
    return `${baseClasses} ${variantClass} ${sizeClass}`;
  }
}
