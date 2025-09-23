import { Component } from '@angular/core';

@Component({
  selector: 'app-chevron-left-icon',
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
      <polyline points="15,18 9,12 15,6" />
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
export class ChevronLeftIcon {}
