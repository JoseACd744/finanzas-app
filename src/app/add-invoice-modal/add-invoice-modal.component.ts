import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-invoice-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './add-invoice-modal.component.html',
  styleUrls: ['./add-invoice-modal.component.css']
})
export class AddInvoiceModalComponent {
  facturaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddInvoiceModalComponent>,
    private fb: FormBuilder
  ) {
    this.facturaForm = this.fb.group({
      numeroFactura: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      tasaInteres: ['', Validators.required],
      seguroDesgravame: [''],
      fechaDescuento: ['', Validators.required],
      fechaVencimiento: ['', Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.facturaForm.valid) {
      const nuevaFactura = this.facturaForm.value;

      // Obtener las facturas existentes de LocalStorage
      const facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
      facturas.push(nuevaFactura);

      // Guardar la nueva lista de facturas en LocalStorage
      localStorage.setItem('facturas', JSON.stringify(facturas));

      this.dialogRef.close(nuevaFactura);
    }
  }
}