import { Component, input } from '@angular/core';
import { UsuarioResponse } from './../../Core/Models/UsuarioResponse';


@Component({
  selector: 'app-card-usuario',
  imports: [],
  templateUrl: './card-usuario.html',
  styleUrl: './card-usuario.css',
})
export class CardUsuario {
  Cuser = input<UsuarioResponse>()
  
}
