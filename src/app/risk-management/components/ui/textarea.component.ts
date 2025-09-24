import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  template: `
    <textarea 
      [placeholder]="placeholder"
      [class]="textareaClasses"
      [value]="value"
      [rows]="rows"
      (input)="onInput($event)"
      (blur)="onBlur.emit($event)"
      (focus)="onFocus.emit($event)">
    </textarea>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .textarea-field {
      display: flex;
      width: 100%;
      border-radius: 0.375rem;
      border: 1px solid var(--border);
      background-color: var(--background);
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      outline: none;
      transition: all 0.2s ease;
      resize: vertical;
      min-height: 2.5rem;
      font-family: inherit;
    }
    
    .textarea-field:focus {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
    
    .textarea-field:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    .textarea-field::placeholder {
      color: var(--muted-foreground);
    }
  `]
})
export class TextareaComponent {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() rows: number = 3;
  @Input() className: string = '';
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();

  get textareaClasses(): string {
    return `textarea-field ${this.className}`;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
  }
}
