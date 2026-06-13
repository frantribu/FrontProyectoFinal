import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { CardUsuario } from "../../../Shared/card-usuario/card-usuario";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-users',
  imports: [CardUsuario, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  service = inject(UsuarioService);
  users = toSignal(this.service.getAll(), {initialValue:[]});
}
