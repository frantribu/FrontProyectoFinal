import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../../../Core/Services/VehiculoService/vehiculo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoDetalleResponse } from '../../../../Core/Models/Vehiculo';
import { AutoDetalleResponse } from '../../../../Core/Models/Auto';

@Component({
  selector: 'app-detalle-auto',
  imports: [],
  templateUrl: './detalle-auto.html',
  styleUrl: './detalle-auto.css',
})
export class DetalleAuto {
  private vehiculoService=inject(VehiculoService);
  private route=inject(ActivatedRoute);

  baseUrl="http://localhost:8080/ImagenesVehiculo/";
  
  router=inject(Router);
  auto=signal<AutoDetalleResponse | null>(null);
  loading=signal<boolean>(false);
  error=signal<string|null>(null);
  indiceImagen=signal<number>(0);

  constructor(){
    const id=Number(this.route.snapshot.paramMap.get("id"));
    this.cargarVehiculo(id);
  }

  cargarVehiculo(id:number){
    this.loading.set(true);
    this.vehiculoService.getDetalleAuto(id).subscribe({
      next:(v)=>{
        this.auto.set(v)
        this.loading.set(false)
        console.log(v);
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

  anterior(){
    if(this.indiceImagen() > 0){
      this.indiceImagen.set(this.indiceImagen() - 1);
    }else{
      this.indiceImagen.set(this.auto()!.imagenes!.length - 1);
    }
  }

  siguiente(){
    if(this.indiceImagen() < this.auto()!.imagenes!.length - 1){
      this.indiceImagen.set(this.indiceImagen() + 1);
    }else{
      this.indiceImagen.set(0);
    }
  }

  irAImagen(index:number){
    this.indiceImagen.set(index);
  }
}
