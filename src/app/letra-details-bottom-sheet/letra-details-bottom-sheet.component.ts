import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-letra-details-bottom-sheet',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatTabsModule],
  templateUrl: './letra-details-bottom-sheet.component.html',
  styleUrls: ['./letra-details-bottom-sheet.component.css']
})
export class LetraDetailsBottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private router: Router, private http: HttpClient) {
    console.log(data); // Verifica que los datos contengan las propiedades correctas
  }
  downloadCSV(): void {
    const csvData = this.convertToCSV(this.data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'letra-details.csv');
    this.addDownloadLog('CSV');
  }

  convertToCSV(objArray: any): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let line = '';

    for (const index in array) {
      if (line !== '') line += ',';
      line += index;
    }

    str += line + '\r\n';

    for (const i in array) {
      let line = '';
      for (const index in array[i]) {
        if (line !== '') line += ',';
        line += array[i][index];
      }
      str += line + '\r\n';
    }

    return str;
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    doc.text('Detalles de la Letra', 10, 10);
    doc.text(`Número: ${this.data.numero}`, 10, 20);
    doc.text(`Cliente: ${this.data.nombreCliente}`, 10, 30);
    doc.text(`Entidad Financiera: ${this.data.nombreEntidad}`, 10, 40); // Actualizado
    doc.text(`Monto: ${this.data.monto}`, 10, 50);
    doc.text(`Fecha de Emisión: ${this.data.fechaEmision}`, 10, 60);
    doc.text(`TEA: ${this.data.TEA}`, 10, 70);
    doc.text(`TEP: ${this.data.TEP}`, 10, 80);
    doc.text(`Tasa Descontada: ${this.data.tasaDescontada}`, 10, 90);
    doc.text(`Descuento: ${this.data.descuento}`, 10, 100);
    doc.text(`Valor Neto: ${this.data.valorNeto}`, 10, 110);
    doc.text(`Valor Recibido: ${this.data.valorRecibido}`, 10, 120);
    doc.text(`Valor Entregado: ${this.data.valorEntregado}`, 10, 130);
    doc.text(`TCEA: ${this.data.TCEA}`, 10, 140);
    doc.save('letra-details.pdf');
    this.addDownloadLog('PDF');
  }

  addDownloadLog(format: string): void {
    const timestamp = new Date().toLocaleString();
    const log = { format, timestamp, userId: this.data.userId, letraId: this.data.letraId };
  
    this.http.post('finanzastf-h0hgfnerg9eca4ba.westus3-01.azurewebsites.net/api/download-log', log).subscribe(
      response => {
        console.log('Historial de descargas guardado', response);
      },
      error => {
        console.error('Error al guardar el historial de descargas', error);
      }
    );
  }

  viewDownloadHistory(): void {
    this.router.navigate(['/download-history']);
  }
}