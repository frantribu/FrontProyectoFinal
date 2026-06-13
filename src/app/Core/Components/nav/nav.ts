import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth-service';
import { Router } from '@angular/router';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  authService=inject(AuthService)
  router = inject(Router)
  auth = inject(AuthService);
  menuUserOpen=false;

  getIniciales(): string {
    const user = this.auth.getUser();
    return user ? `${user?.nombre.charAt(0)}${user.apellido.charAt(0)} ` : ''
  }

  capitalizarNombre(nombre: string): string {
    return nombre.trim()
      .split(/\s+/) // Convierte el string en un arreglo
      .map(
        palabra=>
          palabra.charAt(0).toUpperCase() + palabra.slice(1)
      )
      .join(" ")
  }

  toggleMenuUser():void{
    this.menuUserOpen=!this.menuUserOpen
  }
}
