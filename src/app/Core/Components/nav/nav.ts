import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth-service';
import { Router, RouterLinkActive } from '@angular/router';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  authService=inject(AuthService);
  router = inject(Router);
  menuUserOpen=false;
  navAbierto=signal(false);
  routerLink = RouterLink;

  getIniciales(): string {
    const user = this.authService.getUser();
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

  toggleNav():void{
    this.navAbierto.set(!this.navAbierto())
  }

  verMiPerfil(){
    this.router.navigate(['/mi-perfil'])
  }
}
