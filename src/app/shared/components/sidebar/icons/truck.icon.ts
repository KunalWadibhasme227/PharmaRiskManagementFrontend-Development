import { Component } from '@angular/core';

@Component({
  selector: 'app-truck-icon',
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
      <path d="M16 3h5v13h-5" />
      <path d="M8 3H3v13h5" />
      <path d="M12 5v11" />
      <path d="M4 16h.01" />
      <path d="M20 16h.01" />
      <path d="M4 20h.01" />
      <path d="M20 20h.01" />
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
export class TruckIcon {}
