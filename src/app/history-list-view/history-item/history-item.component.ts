import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LetraDetailsBottomSheetComponent } from '../../letra-details-bottom-sheet/letra-details-bottom-sheet.component';

@Component({
  selector: 'app-history-item',
  standalone: true,
  imports: [MatCardModule],
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
  @Input() letraDetails: any;

  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(LetraDetailsBottomSheetComponent, {
      data: this.letraDetails
    });
  }
}