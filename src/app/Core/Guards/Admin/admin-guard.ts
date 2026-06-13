import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth-service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);

  if(authService.getRol() == "admin"){
    return true;
  }else{
    return router.navigate(['/home'])
  }
  
};
