import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-history-item',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent {
  @Input() title: string = '';
  @Input() cliente: string = '';
  @Input() monto: string = '';
  @Input() tea: string = '';
  @Input() tasaDescuento: string = '';
  @Input() fechaDescuento: string = '';
  @Input() fechaVencimiento: string = '';
}