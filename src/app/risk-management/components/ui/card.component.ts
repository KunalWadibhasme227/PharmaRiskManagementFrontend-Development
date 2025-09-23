import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .card {
      background-color: var(--card);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      transition: all 0.2s ease;
    }
    
    .card:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  `]
})
export class CardComponent {
  @Input() className: string = '';

  get cardClasses(): string {
    return `card ${this.className}`;
  }
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="headerClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .card-header {
      padding: 1.5rem 1.5rem 0 1.5rem;
    }
    
    .card-header-flex {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    
    .card-header-flex .space-y-0 {
      gap: 0;
    }
    
    .pb-2 {
      padding-bottom: 0.5rem;
    }
  `]
})
export class CardHeaderComponent {
  @Input() className: string = '';

  get headerClasses(): string {
    return `card-header ${this.className}`;
  }
}

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 [class]="titleClasses">
      <ng-content></ng-content>
    </h3>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .card-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--card-foreground);
      margin: 0;
      line-height: 1.75rem;
    }
    
    .text-sm {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    
    .font-medium {
      font-weight: 500;
    }
  `]
})
export class CardTitleComponent {
  @Input() className: string = '';

  get titleClasses(): string {
    return `card-title ${this.className}`;
  }
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p [class]="descriptionClasses">
      <ng-content></ng-content>
    </p>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .card-description {
      font-size: 0.875rem;
      color: var(--muted-foreground);
      margin: 0.5rem 0 0 0;
      line-height: 1.25rem;
    }
  `]
})
export class CardDescriptionComponent {
  @Input() className: string = '';

  get descriptionClasses(): string {
    return `card-description ${this.className}`;
  }
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="contentClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .card-content {
      padding: 1.5rem;
    }
  `]
})
export class CardContentComponent {
  @Input() className: string = '';

  get contentClasses(): string {
    return `card-content ${this.className}`;
  }
}
