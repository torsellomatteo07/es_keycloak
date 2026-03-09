import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { DocenteComponent } from './pages/docente/docente.component';
import { StudenteComponent } from './pages/studente/studente.component';
import { AccessoNegato } from './pages/accesso-negato/accesso-negato';
import { authGuard, roleGuard } from './core/auth.guard';
import { ListaSpesa } from './pages/lista-spesa/lista-spesa';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'spesa', component: ListaSpesa, canActivate: [authGuard] },
  { path: 'docente', component: DocenteComponent, canActivate: [authGuard, roleGuard], data: { role: 'docente' } },
  { path: 'studente', component: StudenteComponent, canActivate: [authGuard, roleGuard], data: { role: 'studente' } },
  { path: 'accesso-negato', component: AccessoNegato },
  { path: '**', redirectTo: '' },
];
