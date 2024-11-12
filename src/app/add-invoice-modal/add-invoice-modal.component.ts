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
import { LetraService } from '../services/letra.service';
import { AuthService } from '../auth.service';

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
    private fb: FormBuilder,
    private letraService: LetraService,
    private authService: AuthService
  ) {
    this.facturaForm = this.fb.group({
      numero: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      tasaInteresEfectiva: ['', Validators.required],
      seguroDesgravame: [''],
      fechaDescuento: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      comisionEstudio: [''],
      comisionActivacion: [''],
      comisionOtro: [''],
      retencion: [''],
      gastosAdministrativos: [''],
      portes: [''],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.facturaForm.valid) {
      const nuevaFactura = this.facturaForm.value;
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        nuevaFactura.userId = userId;
  
        this.letraService.createLetra(nuevaFactura).subscribe(
          (response) => {
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error al guardar la factura', error);
          }
        );
      } else {
        console.error('No se pudo obtener el ID del usuario');
      }
    }
  }
}