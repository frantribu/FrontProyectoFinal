import { Component, inject, input, output } from '@angular/core';
import { ClienteService } from '../../Core/Services/ClienteService/cliente-service';
import { ClienteResponse } from '../../Core/Models/Cliente';
import { AuthService } from '../../Core/Services/AuthService/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-cliente',
  imports: [],
  templateUrl: './card-cliente.html',
  styleUrl: './card-cliente.css',
})
export class CardCliente {
  private clienteService=inject(ClienteService);
  private router=inject(Router);

  authService=inject(AuthService);
  
  client = input<ClienteResponse>();
  estadoModificado=output<void>();

  toggleEstadoUsuario(id:number){
    const request=this.client()?.activo ? 
    this.clienteService.deleteCliente(id)
    :this.clienteService.activarCliente(id);

    request.subscribe({
      next:()=>{
        this.estadoModificado.emit();
      },
      error:()=>console.log("Error al cambiar el estado del cliente")
    })
  }

  modificarCliente(){
    this.router.navigate([`/clientes/${this.client()?.id}/editar`])
  }
}
