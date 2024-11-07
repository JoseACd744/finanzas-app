import {Component, EventEmitter, Output,Input} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
  @Output() drawerToggle = new EventEmitter<void>();
  @Input() isSidenavOpen = false;

  constructor() {
  }
  onMenuClick() {
    this.drawerToggle.emit();
  }

}
