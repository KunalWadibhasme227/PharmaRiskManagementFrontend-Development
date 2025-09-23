import { Component } from '@angular/core';

@Component({
  selector: 'app-factory-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M2 20h20" />
      <path d="M4 20V10l4-4 4 4v10" />
      <path d="M12 20V10l4-4 4 4v10" />
      <path d="M8 12h4" />
      <path d="M16 12h4" />
    </svg>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `]
})
export class FactoryIcon {}
