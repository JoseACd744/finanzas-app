import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HistoryViewComponent } from './history-list-view/history-view/history-view.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'history', component: HistoryViewComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];