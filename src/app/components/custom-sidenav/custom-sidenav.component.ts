import { Component, computed, Input, signal } from '@angular/core';
import { MenuItem } from '../../models/menu-items';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-custom-sidenav',
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

profileImageSize = computed(() => this.sideNavCollapsed() ? '32' : '100')

 menuItems = signal<MenuItem[]>([
  {  
    icon: 'dashboard',
    label: 'Dashboard',
    route: 'dashboard'
  },
  // {  
  //   icon: 'analytics',
  //   label: 'Analytics',
  //   route: 'analytics'
  // },
  // {  
  //   icon: 'location-on',
  //   label: 'Analytics',
  //   route: 'analytics'
  // },
  {  
    icon: 'analytics',
    label: 'Make Predictions',
    route: 'make-predictions'
  },
  {  
    icon: 'calendar_today',
    label: 'Six Month Predictions',
    route: 'six-month-predictions'
  },
  {  
    icon: 'map',
    label: 'Heat Map',
    route: 'heat-map'
  }
 ])
}
