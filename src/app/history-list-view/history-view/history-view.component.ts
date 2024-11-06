import { Component } from '@angular/core';
import { HistoryCardsListComponent } from '../history-cards-list/history-cards-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-history-view',
  standalone: true,
  imports: [
    HistoryCardsListComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.css']
})
export class HistoryViewComponent {}