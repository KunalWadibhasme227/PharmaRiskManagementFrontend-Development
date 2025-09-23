import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { BadgeComponent } from '../ui/badge.component';
import { 
  DropdownMenuComponent, 
  DropdownMenuTriggerComponent, 
  DropdownMenuContentComponent,
  DropdownMenuLabelComponent,
  DropdownMenuSeparatorComponent,
  DropdownMenuItemComponent
} from '../ui/dropdown-menu.component';
import { BellIcon } from '../icons/bell.icon';
import { SearchIcon } from '../icons/search.icon';
import { SettingsIcon } from '../icons/settings.icon';
import { UserIcon } from '../icons/user.icon';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    BadgeComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerComponent,
    DropdownMenuContentComponent,
    DropdownMenuLabelComponent,
    DropdownMenuSeparatorComponent,
    DropdownMenuItemComponent,
    BellIcon,
    SearchIcon,
    SettingsIcon,
    UserIcon
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
}
