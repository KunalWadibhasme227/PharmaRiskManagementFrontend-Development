import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PharmaRiskManagementFrontend-Development');
  activeModule = 'overview';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.url;
        if (url === '/' || url === '/overview') {
          this.activeModule = 'overview';
        } else {
          this.activeModule = url.substring(1);
        }
      });
  }

  onModuleChange(moduleId: string): void {
    this.activeModule = moduleId;
  }
}
