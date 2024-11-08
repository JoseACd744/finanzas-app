import { Component } from '@angular/core';
import { HistoryItemComponent } from '../history-item/history-item.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-cards-list',
  standalone: true,
  imports: [
    HistoryItemComponent,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './history-cards-list.component.html',
  styleUrls: ['./history-cards-list.component.css']
})
export class HistoryCardsListComponent {
  displayedColumns: string[] = [
    'numeroLetra', 
    'cliente', 
    'monto', 
    'tea', 
    'tasaDescuento', 
    'fechaDescuento', 
    'fechaVencimiento'
  ];

  items = [
    {
      numeroLetra: '12345',
      cliente: 'NombreCliente',
      monto: 'S/ 50000',
      tea: '12.5%',
      tasaDescuento: '12%',
      fechaDescuento: '08/02/2024',
      fechaVencimiento: '08/02/2025'
    },
    {
      numeroLetra: '12346',
      cliente: 'NombreCliente2',
      monto: 'S/ 60000',
      tea: '13.0%',
      tasaDescuento: '11%',
      fechaDescuento: '10/03/2024',
      fechaVencimiento: '10/03/2025'
    }
  ];

  /*ngOnInit() {
    // Cargar las facturas desde LocalStorage al iniciar el componente
    this.items = JSON.parse(localStorage.getItem('facturas') || '[]');
  }*/
}