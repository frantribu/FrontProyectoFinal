import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth-service';

export const adminOrEmpleadoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isEmpleado() || authService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/home'])
};
