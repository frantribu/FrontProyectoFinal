import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../../../Core/Services/VehiculoService/vehiculo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoDetalleResponse } from '../../../../Core/Models/Moto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-moto',
  imports: [CommonModule],
  templateUrl: './detalle-moto.html',
  styleUrl: './detalle-moto.css',
})
export class DetalleMoto {
  private vehiculoService = inject(VehiculoService);
  private route = inject(ActivatedRoute);
  router = inject(Router);

  baseUrl = "http://localhost:8080/ImagenesVehiculo/";
  
  moto = signal<MotoDetalleResponse | null>(null);
  loading = signal<boolean>(false);
  indiceImagen = signal<number>(0);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.cargarVehiculo(id);
  }

  cargarVehiculo(id: number) {
    this.loading.set(true);
    this.vehiculoService.getDetalleMoto(id).subscribe({
      next: (v) => {
        this.moto.set(v);
        this.loading.set(false);
        console.log(v);
      },
      error: (e) => {
        if (e.status === 403) {
          this.router.navigate(['/vehiculos'])
        } else {
         console.log("Error al cargar la moto: ", e);    
        }
        this.loading.set(false);
      }
    });
  }

  anterior() {
    if (this.indiceImagen() > 0) {
      this.indiceImagen.set(this.indiceImagen() - 1);
    } else {
      this.indiceImagen.set(this.moto()!.imagenes!.length - 1);
    }
  }

  siguiente() {
    if (this.indiceImagen() < this.moto()!.imagenes!.length - 1) {
      this.indiceImagen.set(this.indiceImagen() + 1);
    } else {
      this.indiceImagen.set(0);
    }
  }

  irAImagen(index: number) {
    this.indiceImagen.set(index);
  }
}