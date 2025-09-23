import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="tabsClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .tabs {
      width: 100%;
    }
  `]
})
export class TabsComponent {
  @Input() value: string = '';
  @Input() defaultValue: string = '';
  @Input() className: string = '';
  @Output() valueChange = new EventEmitter<string>();

  get tabsClasses(): string {
    return `tabs ${this.className}`;
  }
}

@Component({
  selector: 'app-tabs-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="tabsListClasses" role="tablist">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .tabs-list {
      display: flex;
      width: 100%;
      background-color: var(--muted);
      border-radius: 0.375rem;
      padding: 0.25rem;
    }
    
    .tabs-list-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    
    .tabs-list-auto {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  `]
})
export class TabsListComponent {
  @Input() className: string = '';

  get tabsListClasses(): string {
    return `tabs-list ${this.className}`;
  }
}

@Component({
  selector: 'app-tabs-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="triggerClasses"
      [attr.data-state]="isActive ? 'active' : 'inactive'"
      (click)="onClick()"
      role="tab"
      [attr.aria-selected]="isActive">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .tabs-trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--muted-foreground);
    }
    
    .tabs-trigger:hover {
      color: var(--foreground);
    }
    
    .tabs-trigger[data-state="active"] {
      background-color: var(--background);
      color: var(--foreground);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
  `]
})
export class TabsTriggerComponent {
  @Input() value: string = '';
  @Input() className: string = '';
  @Input() isActive: boolean = false;
  @Output() tabClick = new EventEmitter<string>();

  get triggerClasses(): string {
    return `tabs-trigger ${this.className}`;
  }

  onClick(): void {
    this.tabClick.emit(this.value);
  }
}

@Component({
  selector: 'app-tabs-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isActive"
      [class]="contentClasses"
      role="tabpanel"
      [attr.data-state]="isActive ? 'active' : 'inactive'">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .tabs-content {
      margin-top: 1.5rem;
      outline: none;
    }
  `]
})
export class TabsContentComponent {
  @Input() value: string = '';
  @Input() className: string = '';
  @Input() isActive: boolean = false;

  get contentClasses(): string {
    return `tabs-content ${this.className}`;
  }
}
