import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from './shared/side-navbar/side-navbar.component';
import { CommonModule } from '@angular/common';
import { AppToolbarComponent } from './shared/app-toolbar/app-toolbar.component';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { AddInvoiceModalComponent } from './add-invoice-modal/add-invoice-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideNavbarComponent,
    CommonModule,
    AppToolbarComponent,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    AddInvoiceModalComponent,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finanzas-app';

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpen = true;

  constructor(private authService: AuthService) {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenav.toggle();
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}