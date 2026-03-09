import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Keycloak from 'keycloak-js';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const keycloak = inject(Keycloak);
  if (keycloak.authenticated) return true;
  keycloak.login({ redirectUri: window.location.origin + state.url });
  return false;
};

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data?.['role'];
  if (authService.hasRole(expectedRole)) return true;
  router.navigate(['/accesso-negato']);
  return false;
};

// Manteniamo questa per compatibilità col vecchio codice
export const userPlusGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasRole('user_plus')) return true;
  router.navigate(['/']);
  return false;
};
