import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  authService=inject(AuthService)
  router = inject(Router)

  navigateToUsers(){
    return this.router.navigate(['/users'])
  }
}
