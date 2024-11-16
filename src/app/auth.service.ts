import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://finanzastf-h0hgfnerg9eca4ba.westus3-01.azurewebsites.net/api/users';

  constructor(private http: HttpClient) {}

  register(user: { username: string, password: string, name: string, email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<{ token: string, userId: number }>(`${this.apiUrl}/login`, user).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('currentUser', JSON.stringify({ token: response.token, userId: response.userId }));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser).token;
      return this.isTokenValid(token);
    }
    return false;
  }

  getCurrentUserId(): number | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser).userId;
    }
    return null;
  }

  private isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}

