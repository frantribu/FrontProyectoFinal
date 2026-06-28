import { Component, inject, signal } from '@angular/core';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';
import { TallerResponse } from '../../../Core/Models/Taller';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../Core/Services/AuthService/auth-service';

@Component({
  selector: 'app-list-talleres',
  imports: [RouterLink],
  templateUrl: './list-talleres.html',
  styleUrl: './list-talleres.css',
})
export class ListTalleres {
  private tallerService = inject(TallerService);
  private router = inject(Router);

  authService = inject(AuthService);
  activo = signal<string>("");
  talleres = signal<TallerResponse[]>([]);

  constructor() {
      this.getTalleres();
  }

  getTalleres() {
    this.talleres.set([]);

    this.tallerService.getTalleres(this.activo()).subscribe({
      next: (t) => this.talleres.set(t),
      error: (e) => console.log("Error al cargar los talleres: ", e)
    })
  }

  toggleEstadoTaller(taller: TallerResponse) {
    const request = taller.activo ?
      this.tallerService.desactivarTaller(taller.id)
      : this.tallerService.reactivarTaller(taller.id);

    request.subscribe({
      next: () => this.getTalleres(),
      error: () => console.log("Error al cambiar el estado del taller")
    })
  }

  onEstadoChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.activo.set(value);
    this.getTalleres();
  }

  verDetalle(id: number) {
    this.router.navigate([`${this.authService.isAdmin() ? '/talleres/' : '/mis-talleres/'}`+ id])
  }

}
