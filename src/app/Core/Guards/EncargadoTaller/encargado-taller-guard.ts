import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth-service';
import { inject } from '@angular/core';

export const encargadoTallerGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isEncargado()) {
    return true;
  }

  return router.createUrlTree(['/mis-talleres'])
};
