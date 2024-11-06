import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChangeDetectionStrategy, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIconModule} from '@angular/material/icon';
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatDividerModule,
    MatListItem,
    MatNavList
  ],
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
  @Output() sidenavClose = new EventEmitter<void>();

  closeSidenav() {
    this.sidenavClose.emit();  // Emite el evento para cerrar el sidenav
  }
}