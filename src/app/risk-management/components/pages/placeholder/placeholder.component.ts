import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {
  pageName = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the page name from the route
    this.pageName = this.route.snapshot.url[0]?.path || 'Page';
    // Convert kebab-case to Title Case
    this.pageName = this.pageName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
