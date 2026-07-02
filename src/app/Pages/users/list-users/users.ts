import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { CardUsuario } from "../../../Shared/card-usuario/card-usuario";
import { UsuarioResponse } from '../../../Core/Models/Usuario';

@Component({
  selector: 'app-users',
  imports: [CardUsuario],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  usuarioService = inject(UsuarioService);
  users = signal<UsuarioResponse[]>([]);

  activoSeleccionado = signal<string>("")

  constructor() {
    this.getUsers()
  }

  getUsers() {
    this.usuarioService.getAll(this.activoSeleccionado()).subscribe({
      next: (u) => {
        this.users.set(u);
      },
      error: () => console.log("Error al cargar los usuarios")
    })
  }

  onActivoChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.activoSeleccionado.set(value)
    this.getUsers()
  }
}
