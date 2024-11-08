// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'registeredUsers';

  constructor() {}

  // Registrar un nuevo usuario
  register(user: { username: string, password: string }) {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const userExists = users.some((u: any) => u.username === user.username);

    if (userExists) {
      throw new Error('El usuario ya existe');
    }

    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  // Iniciar sesión
  login(user: { username: string, password: string }): boolean {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const validUser = users.find((u: any) => u.username === user.username && u.password === user.password);

    if (validUser) {
      localStorage.setItem('currentUser', JSON.stringify(validUser));
      return true;
    } else {
      return false;
    }
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('currentUser');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}