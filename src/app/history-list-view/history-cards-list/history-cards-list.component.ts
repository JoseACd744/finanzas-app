import { Component, OnInit } from '@angular/core';
import { HistoryItemComponent } from '../history-item/history-item.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { LetraService } from '../../services/letra.service';
import { AuthService } from '../../auth.service';
import { LetraDetailsBottomSheetComponent } from '../../letra-details-bottom-sheet/letra-details-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

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
export class HistoryCardsListComponent implements OnInit {
  displayedColumns: string[] = [
    'numeroLetra', 
    'cliente', 
    'nombreEntidadFinanciera',
    'monto', 
    'fechaEmision',
    'tea', 
    'tasaDescuento', 
    'fechaDescuento', 
    'fechaVencimiento'
  ];

  items: any[] = [];

  constructor(
    private letraService: LetraService,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.loadLetras();
  }

  loadLetras(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.letraService.getLetras(userId).subscribe(
        (data) => {
          this.items = data;
        },
        (error) => {
          console.error('Error al cargar las letras', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }

  openBottomSheet(letra: any): void {
    this.bottomSheet.open(LetraDetailsBottomSheetComponent, {
      data: {
        letraId: letra.id,
        userId: letra.userId,
        numero: letra.numero,
        nombreCliente: letra.nombreCliente,
        nombreEntidad: letra.nombreEntidad, // Asegúrate de que esta propiedad esté correcta
        monto: letra.monto,
        fechaInicio: letra.fechaInicio, // Asegúrate de que esta propiedad esté correcta
        TEA: letra.TEA,
        TEP: letra.TEP,
        tasaDescontada: letra.tasaDescontada,
        descuento: letra.descuento,
        valorNeto: letra.valorNeto,
        valorRecibido: letra.valorRecibido,
        valorEntregado: letra.valorEntregado,
        TCEA: letra.TCEA
      }
    });
  }
}