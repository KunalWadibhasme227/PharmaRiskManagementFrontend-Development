import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input 
      [type]="type"
      [placeholder]="placeholder"
      [class]="inputClasses"
      [value]="value"
      (input)="handleInput($event)"
      (blur)="onBlur.emit($event)"
      (focus)="onFocus.emit($event)">
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .input-field {
      display: flex;
      height: 2.5rem;
      width: 100%;
      border-radius: 0.375rem;
      border: 1px solid var(--border);
      background-color: var(--background);
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      outline: none;
      transition: all 0.2s ease;
    }
    
    .input-field:focus {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
    
    .input-field:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    .input-field::placeholder {
      color: var(--muted-foreground);
    }
  `]
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onInput = new EventEmitter<Event>();

  get inputClasses(): string {
    return 'input-field';
  }

  // onInput(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   this.value = target.value;
  // }
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onInput.emit(event); // 🔥 This line notifies the parent
  }
}
