import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  collapsed = signal(false);

  sideNavWidth = computed(() => this.collapsed() ? '65px' : '250px')

}
