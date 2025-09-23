import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart-3-icon',
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
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
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
export class BarChart3Icon {}
