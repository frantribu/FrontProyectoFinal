import { Component, inject, input } from '@angular/core';
import { UsuarioService } from '../../Core/Services/UsuarioService/usuario-service';
import { Usuario } from '../../Core/Models/Usuario';

@Component({
  selector: 'app-card-usuario',
  imports: [],
  templateUrl: './card-usuario.html',
  styleUrl: './card-usuario.css',
})
export class CardUsuario {
  private usuarioService=inject(UsuarioService);

  Cuser = input<Usuario>()

  toggleEstadoUsuario(id:number){
    const request=this.Cuser()?.activo ? 
    this.usuarioService.deleteUser(id)
    :this.usuarioService.activarUsuario(id);

    request.subscribe({
      next:()=>console.log("Estado del usuario actualizado"),
      error:()=>console.log("Error al cambiar el estado del usuario")
    })
  }
}
