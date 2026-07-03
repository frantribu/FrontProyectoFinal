import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { CrearVentaRequest } from '../../../Core/Models/Venta';
import { AuthService } from '../../../Core/Services/AuthService/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../Core/Services/ClienteService/cliente-service';
import { VehiculoService } from '../../../Core/Services/VehiculoService/vehiculo-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClienteResponse } from '../../../Core/Models/Cliente';
import { VehiculoResponse } from '../../../Core/Models/Vehiculo';

@Component({
  selector: 'app-form-venta',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './form-venta.html',
  styleUrl: './form-venta.css',
})
export class FormVenta {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private vehiculoService = inject(VehiculoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  vehiculoId = Number(this.route.snapshot.paramMap.get("id"));

  vehiculo = signal<VehiculoResponse | null>(null);
  clientes = signal<ClienteResponse[]>([]);

  constructor() {
    this.getClientes();
    this.getVehiculo();
  }

  form = this.fb.nonNullable.group({
    clienteId: [null, Validators.required],
    precioVenta: [0, [Validators.required, Validators.min(1)]]
  })

  agregarVenta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formulario = this.form.getRawValue();

    const venta: CrearVentaRequest = {
      clienteId: formulario.clienteId!,
      precioVenta: formulario.precioVenta,
    }

    this.vehiculoService.agregarVenta(this.vehiculoId, venta).subscribe({
      next: () => this.router.navigate(['/ventas']),
      error: (e) => console.log("Error al cargar la venta: ", e)
    })
  }

  getClientes() {
    this.clienteService.getClientes(true).subscribe({
      next: (cli) => this.clientes.set(cli),
      error: () => console.log("Error al cargar los clientes")
    })
  }

  getVehiculo(){
    this.vehiculoService.getDetalleVehiculo(this.vehiculoId).subscribe({
      next:(v)=>this.vehiculo.set(v),
      error:(e)=>{
        if(e.status==403){
          this.router.navigate(['/vehiculos'])
        }else{
          console.log("Error al cargar el vehiculo");
        }
      }
    })
  }
}
