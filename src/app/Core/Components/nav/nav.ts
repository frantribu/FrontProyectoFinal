import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth-service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  authService=inject(AuthService)
}
