import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LetraService } from '../services/letra.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule
  ],
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent {
  facturaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private letraService: LetraService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.facturaForm = this.fb.group({
      numero: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      nombreEntidad: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(0)]],
      tasaInteresEfectiva: [0, Validators.required],
      seguroDesgravame: [0],
      fechaDescuento: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      comisionEstudio: [0],
      comisionActivacion: [0],
      comisionOtro: [0],
      retencion: [0],
      gastosAdministrativos: [0],
      portes: [0]
    }, { validators: this.dateRangeValidator });
  }

  dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const fechaDescuento = group.get('fechaDescuento')?.value;
    const fechaVencimiento = group.get('fechaVencimiento')?.value;
    if (fechaDescuento && fechaVencimiento) {
      const diffInYears = (new Date(fechaVencimiento).getFullYear() - new Date(fechaDescuento).getFullYear());
      return diffInYears <= 10 ? null : { 'dateRangeInvalid': true };
    }
    return null;
  }

  guardar(): void {
    if (this.facturaForm.valid) {
      const nuevaFactura = this.facturaForm.value;
      this.convertirTasas(nuevaFactura);
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        nuevaFactura.userId = userId;

        this.letraService.createLetra(nuevaFactura).subscribe(
          (response) => {
            this.router.navigate(['/invoices']);
            this.showSnackBar('Factura guardada exitosamente', 'Cerrar');
          },
          (error) => {
            console.error('Error al guardar la factura', error);
            this.showSnackBar('Error al guardar la factura', 'Cerrar');
          }
        );
      } else {
        console.error('No se pudo obtener el ID del usuario');
        this.showSnackBar('No se pudo obtener el ID del usuario', 'Cerrar');
      }
    }
  }

  convertirTasas(factura: any): void {
    // Implementa la lógica de conversión de tasas aquí
  }

  cancelar(): void {
    this.router.navigate(['/invoices']);
  }

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}