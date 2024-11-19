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
      tasaInteresEfectiva: [0, [Validators.required, Validators.min(0), Validators.max(30)]],
      seguroDesgravame: [0, [Validators.required, Validators.min(0), Validators.max(2)]],
      fechaDescuento: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      comisionEstudio: [0, [Validators.min(0)]],
      comisionActivacion: [0, [Validators.min(0)]],
      comisionOtro: [0, [Validators.min(0)]],
      retencion: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      gastosAdministrativos: [0, [Validators.min(0)]],
      portes: [0, [Validators.min(0)]]
    });
  }

  guardar(): void {
    if (this.facturaForm.valid) {
      const nuevaFactura = this.facturaForm.value;
      this.convertirTasas(nuevaFactura);
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        nuevaFactura.userId = userId;

        this.letraService.createLetra(nuevaFactura).subscribe({
          next: () => {
            this.router.navigate(['/history']);
            this.showSnackBar('Factura guardada exitosamente', 'Cerrar');
          },
          error: (error) => {
            console.error('Error al guardar la factura', error);
            this.showSnackBar('Error al guardar la factura', 'Cerrar');
          }
        });
      } else {
        console.error('No se pudo obtener el ID del usuario');
        this.showSnackBar('No se pudo obtener el ID del usuario', 'Cerrar');
      }
    }
  }

  convertirTasas(factura: any): void {
    factura.tasaInteresEfectiva = this.convertirATasa(factura.tasaInteresEfectiva);
    factura.seguroDesgravame = this.convertirATasa(factura.seguroDesgravame);
    factura.retencion = this.convertirATasa(factura.retencion);
  }

  convertirATasa(valor: any): number {
    if (typeof valor === 'string' && valor.includes('%')) {
      return parseFloat(valor.replace('%', '')) / 100;
    } else if (typeof valor === 'number' && valor > 0 && valor < 1) {
      return valor;
    } else {
      return valor / 100;
    }
  }

  cancelar(): void {
    this.router.navigate(['/history']);
  }

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}