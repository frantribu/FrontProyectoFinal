import { Component, inject, signal } from '@angular/core';
import { ClienteService } from '../../../Core/Services/ClienteService/cliente-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClienteResponse } from '../../../Core/Models/Cliente';
import { CardCliente } from '../../../Shared/card-cliente/card-cliente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-clientes',
  imports: [CardCliente, RouterLink],
  templateUrl: './list-clientes.html',
  styleUrl: './list-clientes.css',
})
export class ListClientes {

  clienteService = inject(ClienteService)
  clientes = signal<ClienteResponse[]>([]);

  activoSeleccionado = signal<string>("")

  constructor() {
    this.getClientes()
  }

  getClientes() {
    this.clienteService.getClientes(this.activoSeleccionado(), " ").subscribe({
      next: (u) => {
        this.clientes.set(u);
      },
      error: () => console.log("Error al cargar los clientes")
    })
  }

  onActivoChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.activoSeleccionado.set(value)
    this.getClientes()
  }
}
