import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,  // Importa CommonModule para habilitar *ngIf
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatLabel,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (this.authService.login({ username, password })) {
        //alert('Inicio de sesión exitoso');
        this.router.navigate(['/history']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrecta';
      }
    }
  }

  // Método para redirigir a Register en la Opción 2
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}