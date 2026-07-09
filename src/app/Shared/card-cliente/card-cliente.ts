import { Component, inject, input } from '@angular/core';
import { ClienteService } from '../../Core/Services/ClienteService/cliente-service';
import { ClienteResponse } from '../../Core/Models/Cliente';

@Component({
  selector: 'app-card-cliente',
  imports: [],
  templateUrl: './card-cliente.html',
  styleUrl: './card-cliente.css',
})
export class CardCliente {
  private clienteService=inject(ClienteService);

  client = input<ClienteResponse>()

  toggleEstadoUsuario(id:number){
    const request=this.client()?.activo ? 
    this.clienteService.deleteCliente(id)
    :this.clienteService.activarCliente(id);

    request.subscribe({
      next:()=>console.log("Estado del cliente actualizado"),
      error:()=>console.log("Error al cambiar el estado del cliente")
    })
  }
}
