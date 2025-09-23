import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <ng-content select="[trigger]"></ng-content>
      <div 
        *ngIf="isOpen" 
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        [class]="contentClass">
        <ng-content select="[content]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class DropdownMenuComponent {
  @Input() isOpen = false;
  @Input() contentClass = '';

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }
}

@Component({
  selector: 'app-dropdown-menu-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      type="button" 
      class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class DropdownMenuTriggerComponent {
  @Output() onClick = new EventEmitter<Event>();
}

@Component({
  selector: 'app-dropdown-menu-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-1" role="menu" aria-orientation="vertical">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DropdownMenuContentComponent {}

@Component({
  selector: 'app-dropdown-menu-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-4 py-2 text-sm text-gray-700">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DropdownMenuLabelComponent {}

@Component({
  selector: 'app-dropdown-menu-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border-t border-gray-100"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DropdownMenuSeparatorComponent {}

@Component({
  selector: 'app-dropdown-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a 
      href="#" 
      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      role="menuitem"
      (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </a>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DropdownMenuItemComponent {
  @Output() onClick = new EventEmitter<Event>();
}
