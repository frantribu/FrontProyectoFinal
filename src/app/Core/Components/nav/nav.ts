import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth-service';
import { Router, RouterLinkActive } from '@angular/router';
import { RouterLink } from "@angular/router";
import { UsuarioService } from '../../Services/UsuarioService/usuario-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsuarioResponse } from '../../Models/Usuario';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  authService = inject(AuthService);
  router = inject(Router);
  menuUserOpen = false;
  navAbierto = signal(false);
  routerLink = RouterLink;

  usuarioService = inject(UsuarioService);

  userSignal = signal<UsuarioResponse | null>(this.authService.getUser())

  constructor(){
    this.router.events.subscribe(() => {
      this.userSignal.set(this.authService.getUser())
    })
  }


  getIniciales(): string {
    return this.userSignal() ? `${this.userSignal()?.nombre.charAt(0)}${this.userSignal()?.apellido.charAt(0)} ` : ''
  }

  capitalizarNombre(nombre: string): string {
    return nombre.trim()
      .split(/\s+/)
      .map(
        palabra =>
          palabra.charAt(0).toUpperCase() + palabra.slice(1)
      )
      .join(" ")
  }

  toggleMenuUser(): void {
    this.menuUserOpen = !this.menuUserOpen
  }

  toggleNav(): void {
    this.navAbierto.set(!this.navAbierto())
  }

  verMiPerfil() {
    this.router.navigate(['/mi-perfil'])
  }
}
