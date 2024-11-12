import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { LetraService } from '../services/letra.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule],
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {
  user: any;
  letraCount: number = 0;

  constructor(private http: HttpClient, private authService: AuthService, private letraService: LetraService) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.http.get(`finanzastf-h0hgfnerg9eca4ba.westus3-01.azurewebsites.net/api/users/${userId}`).subscribe((data: any) => {
        this.user = data;
      });

      this.letraService.getLetraCount(userId).subscribe(
        (count) => {
          this.letraCount = count;
        },
        (error) => {
          console.error('Error al cargar la cantidad de letras', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }
}