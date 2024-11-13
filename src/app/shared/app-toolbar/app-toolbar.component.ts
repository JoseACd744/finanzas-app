import {Component, EventEmitter, Output,Input} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app-toolbar.component.html',
  styleUrl: './app-toolbar.component.css'
})
export class AppToolbarComponent {
  title = 'finanzas-app';
  @Input() isSidenavOpen: boolean = false;
  @Output() drawerToggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  onMenuClick() {
    this.drawerToggle.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
