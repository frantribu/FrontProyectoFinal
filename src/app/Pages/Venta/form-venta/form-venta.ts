import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { VentaService } from '../../../Core/Services/VentaService/venta-service';
import { CrearVentaRequest } from '../../../Core/Models/Venta';
import { AuthService } from '../../../Core/Services/AuthService/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../Core/Services/ClienteService/cliente-service';
import { VehiculoService } from '../../../Core/Services/VehiculoService/vehiculo-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClienteResponse } from '../../../Core/Models/Cliente';

@Component({
  selector: 'app-form-venta',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './form-venta.html',
  styleUrl: './form-venta.css',
})
export class FormVenta {
  private fb = inject(FormBuilder);
  private ventaService = inject(VentaService);
  private authService = inject(AuthService);
  private clienteService = inject(ClienteService);
  private vehiculoService = inject(VehiculoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  usuarioLogueado = this.authService.getUser();

  vehiculoId = Number(this.route.snapshot.paramMap.get("id"));

  vehiculo = toSignal(this.vehiculoService.getDetalleVehiculo(this.vehiculoId));
  clientes = signal<ClienteResponse[]>([]);

  constructor(){
    this.getClientes()
  }

  form = this.fb.nonNullable.group({
    clienteId: [0, Validators.required],
    precioVenta: [0, Validators.required]
  })

  agregarVenta() {
    const formulario = this.form.getRawValue();

    const venta: CrearVentaRequest = {
      clienteId: formulario.clienteId,
      precioVenta: formulario.precioVenta,
      vehiculoId: this.vehiculoId,
      vendedorId: this.usuarioLogueado!.id
    }

    this.ventaService.agregarVenta(venta).subscribe({
      next: () => this.router.navigate(['/ventas']),
      error:(e)=>console.log("Error al cargar la venta: ", e)
    })
  }

  getClientes(){
    this.clienteService.getClientes(true).subscribe({
      next:(cli)=>{this.clientes.set(cli)

        console.log(this.clientes())
      },
      error:()=>console.log("Error al cargar los clientes")
    })
  }
}
