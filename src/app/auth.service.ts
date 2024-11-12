import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from './services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private apiUrl = `${this.baseUrl}users`;

  constructor(http: HttpClient) {
    super(http);
  }

  // Registrar un nuevo usuario
  register(user: { username: string, password: string, name: string, email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  // Iniciar sesión
  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<{ token: string, userId: number }>(`${this.apiUrl}/login`, user).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('currentUser');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUserId(): number | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser).userId;
    }
    return null;
  }
}