import { Component, inject, input, output } from '@angular/core';
import { UsuarioResponse } from '../../Core/Models/Usuario';
import { UsuarioService } from '../../Core/Services/UsuarioService/usuario-service';

@Component({
  selector: 'app-card-usuario',
  imports: [],
  templateUrl: './card-usuario.html',
  styleUrl: './card-usuario.css',
})
export class CardUsuario {
  private usuarioService = inject(UsuarioService);

  user = input<UsuarioResponse>();
  estadoModificado = output<void>();

  toggleEstadoUsuario(id: number) {
    const request = this.user()?.activo ?
      this.usuarioService.deleteUser(id)
      : this.usuarioService.activarUsuario(id);

    request.subscribe({
      next: () => this.estadoModificado.emit(),
      error: () => console.log("Error al cambiar el estado del usuario")
    })
  }
}
