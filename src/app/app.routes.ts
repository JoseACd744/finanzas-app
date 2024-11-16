import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HistoryViewComponent } from './history-list-view/history-view/history-view.component';
import { AuthGuard } from './auth.guard';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';
import { DownloadHistoryComponent } from './download-history/download-history.component';
import { AddInvoiceComponent } from './add-invoice-modal/add-invoice.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'history', component: HistoryViewComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'download-history', component: DownloadHistoryComponent, canActivate: [AuthGuard] },
  { path: 'add-invoice', component: AddInvoiceComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];