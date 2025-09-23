import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="selectClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .select {
      position: relative;
    }
  `]
})
export class SelectComponent {
  @Input() value: string = '';
  @Input() className: string = '';

  get selectClasses(): string {
    return `select ${this.className}`;
  }
}

@Component({
  selector: 'app-select-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="triggerClasses"
      (click)="onClick()"
      type="button">
      <span *ngIf="!value" class="select-placeholder">{{ placeholder }}</span>
      <span *ngIf="value" class="select-value">{{ value }}</span>
      <span class="select-arrow">▼</span>
    </button>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .select-trigger {
      display: flex;
      height: 2.5rem;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.375rem;
      border: 1px solid var(--border);
      background-color: var(--background);
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      outline: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .select-trigger:hover {
      border-color: var(--border);
    }
    
    .select-trigger:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 20%, transparent);
    }
    
    .select-placeholder {
      color: var(--muted-foreground);
    }
    
    .select-value {
      color: var(--foreground);
    }
    
    .select-arrow {
      color: var(--muted-foreground);
      font-size: 0.75rem;
    }
  `]
})
export class SelectTriggerComponent {
  @Input() placeholder: string = 'Select an option';
  @Input() value: string = '';
  @Input() className: string = '';

  get triggerClasses(): string {
    return `select-trigger ${this.className}`;
  }

  onClick(): void {
    // This will be handled by the parent select component
  }
}

@Component({
  selector: 'app-select-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="contentClasses" *ngIf="isOpen">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .select-content {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 50;
      margin-top: 0.25rem;
      background-color: var(--background);
      border: 1px solid var(--border);
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      max-height: 15rem;
      overflow-y: auto;
    }
  `]
})
export class SelectContentComponent {
  @Input() className: string = '';
  @Input() isOpen: boolean = false;

  get contentClasses(): string {
    return `select-content ${this.className}`;
  }
}

@Component({
  selector: 'app-select-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="itemClasses"
      (click)="onClick()"
      role="option">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .select-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .select-item:hover {
      background-color: var(--muted);
    }
    
    .select-item.selected {
      background-color: color-mix(in srgb, var(--primary) 10%, transparent);
      color: var(--primary);
    }
  `]
})
export class SelectItemComponent {
  @Input() value: string = '';
  @Input() className: string = '';
  @Input() isSelected: boolean = false;

  get itemClasses(): string {
    return `select-item ${this.isSelected ? 'selected' : ''} ${this.className}`;
  }

  onClick(): void {
    // This will be handled by the parent select component
  }
}
