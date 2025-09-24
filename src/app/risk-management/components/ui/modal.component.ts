import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="onOverlayClick()">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button class="modal-close" (click)="onClose.emit()" type="button">
            <span class="close-icon">×</span>
          </button>
        </div>
        <div class="modal-content">
          <ng-content></ng-content>
        </div>
        <div class="modal-footer" *ngIf="showFooter">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .modal-container {
      background-color: var(--background);
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      width: 100%;
      max-width: 32rem;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 1.5rem 0 1.5rem;
      border-bottom: 1px solid var(--border);
      margin-bottom: 1.5rem;
    }

    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--foreground);
      margin: 0;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--muted-foreground);
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
    }

    .modal-close:hover {
      background-color: var(--muted);
      color: var(--foreground);
    }

    .close-icon {
      display: block;
      line-height: 1;
    }

    .modal-content {
      padding: 0 1.5rem;
      flex: 1;
      overflow-y: auto;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--border);
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    @media (max-width: 640px) {
      .modal-container {
        max-width: 100%;
        margin: 0;
      }
      
      .modal-header {
        padding: 1rem 1rem 0 1rem;
      }
      
      .modal-content {
        padding: 0 1rem;
      }
      
      .modal-footer {
        padding: 1rem;
        flex-direction: column;
      }
    }
  `]
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() showFooter: boolean = true;
  @Output() onClose = new EventEmitter<void>();

  onOverlayClick(): void {
    this.onClose.emit();
  }
}
