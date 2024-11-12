import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LetraService } from '../services/letra.service';

@Component({
  selector: 'app-download-history',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDividerModule],
  templateUrl: './download-history.component.html',
  styleUrls: ['./download-history.component.css']
})
export class DownloadHistoryComponent implements OnInit {
  downloadLogs: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private letraService: LetraService) {}

  ngOnInit(): void {
    this.loadDownloadLogs();
  }

  loadDownloadLogs(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.http.get<any[]>(`http://finanzastf-h0hgfnerg9eca4ba.westus3-01.azurewebsites.net/api/download-log/user/${userId}`).subscribe(
        logs => {
          this.downloadLogs = logs;
          this.loadLetraDetails();
        },
        error => {
          console.error('Error al obtener el historial de descargas', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }

  loadLetraDetails(): void {
    this.downloadLogs.forEach(log => {
      this.letraService.getLetraById(log.letraId).subscribe(
        letra => {
          log.letraNombre = letra.numero; // Asume que el modelo Letra tiene un campo 'nombre'
        },
        error => {
          console.error('Error al obtener los detalles de la letra', error);
        }
      );
    });
  }
}