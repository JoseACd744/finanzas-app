import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Letra } from '../models/letra.model';

@Injectable({
  providedIn: 'root'
})
export class LetraService {
  private apiUrl = 'https://prod-fullstack-hfckgufbhdccgecd.eastus2-01.azurewebsites.net/api/letras'; // Cambia esto a tu URL de API

  constructor(private http: HttpClient) {}

  createLetra(letra: Letra): Observable<Letra> {
    return this.http.post<Letra>(`${this.apiUrl}`, letra);
  }

  getLetras(userId: number): Observable<Letra[]> {
    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId.toString());
    }
    return this.http.get<Letra[]>(`${this.apiUrl}`, { params });
  }

  getLetraById(id: number): Observable<Letra> {
    return this.http.get<Letra>(`${this.apiUrl}/${id}`);
  }

  updateLetra(id: number, letra: Letra): Observable<Letra> {
    return this.http.put<Letra>(`${this.apiUrl}/${id}`, letra);
  }

  deleteLetra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  getLetraCount(userId: number): Observable<number> {
    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId.toString());
    }
    return this.http.get<number>(`${this.apiUrl}/count`, { params });
  }
}