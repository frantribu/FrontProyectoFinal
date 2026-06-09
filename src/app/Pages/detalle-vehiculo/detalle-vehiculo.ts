import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../Core/Services/VehiculoService/vehiculo-service';
import { VehiculoDetalleResponse } from '../../Core/Models/Vehiculo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-vehiculo',
  imports: [],
  templateUrl: './detalle-vehiculo.html',
  styleUrl: './detalle-vehiculo.css',
})
export class DetalleVehiculo {
  private vehiculoService=inject(VehiculoService);
  private route=inject(ActivatedRoute);
  
  router=inject(Router);
  vehiculo=signal<VehiculoDetalleResponse | null>(null);
  loading=signal<boolean>(false);
  error=signal<string|null>(null);

  constructor(){
    const id=Number(this.route.snapshot.paramMap.get("id"));
    this.cargarVehiculo(id);
  }

  cargarVehiculo(id:number){
    this.loading.set(true);
    this.vehiculoService.getDetalleVehiculo(id).subscribe({
      next:(v)=>{
        this.vehiculo.set(v)
        this.loading.set(false)
      },
      error:(e)=>{
        if(e.status===403){
          this.error.set("El vehiculo no existe")
          console.log(e)
        }else{
          this.error.set("Ocurrio un error")
        }
        this.loading.set(false)
      }
    })
  }
}
