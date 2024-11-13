import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceModalComponent {
cancelar() {
throw new Error('Method not implemented.');
}
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
      // Lógica para guardar la factura
      console.log(this.facturaForm.value);
      this.dialogRef.close(this.facturaForm.value);
    }
  }
}