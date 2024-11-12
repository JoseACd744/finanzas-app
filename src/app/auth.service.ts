import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';

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