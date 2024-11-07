import { Component } from '@angular/core';
import { HistoryItemComponent } from '../history-item/history-item.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-cards-list',
  standalone: true,
  imports: [
    HistoryItemComponent,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './history-cards-list.component.html',
  styleUrls: ['./history-cards-list.component.css']
})
export class HistoryCardsListComponent {
  items = [
    {
      title: 'Letra #12345',
      cliente: 'NombreCliente',
      monto: 'S/ 50000',
      tea: '12.5%',
      tasaDescuento: '12%',
      fechaDescuento: '08/02/2024',
      fechaVencimiento: '08/02/2025'
    },
    {
      title: 'Letra #12346',
      cliente: 'NombreCliente2',
      monto: 'S/ 60000',
      tea: '13.0%',
      tasaDescuento: '11%',
      fechaDescuento: '10/03/2024',
      fechaVencimiento: '10/03/2025'
    }
  ];
}