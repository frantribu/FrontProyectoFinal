import { Component, input } from '@angular/core';
import { Usuario } from './../../Core/Models/Usuario';


@Component({
  selector: 'app-card-usuario',
  imports: [],
  templateUrl: './card-usuario.html',
  styleUrl: './card-usuario.css',
})
export class CardUsuario {
  Cuser = input<Usuario>()
  
}
