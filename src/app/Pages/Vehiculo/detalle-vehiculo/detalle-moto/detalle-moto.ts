import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../../../Core/Services/VehiculoService/vehiculo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoDetalleResponse } from '../../../../Core/Models/Moto';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../Core/Services/AuthService/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { AsignarTallerModal } from '../../../../Core/Components/asignar-taller-modal/asignar-taller-modal';

@Component({
  selector: 'app-detalle-moto',
  imports: [CommonModule],
  templateUrl: './detalle-moto.html',
  styleUrl: './detalle-moto.css',
})
export class DetalleMoto {
  private vehiculoService = inject(VehiculoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  authService = inject(AuthService);
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

  editarMoto(id: number) {
    this.router.navigate([`/vehiculos/moto/${id}/editar`])
  }

  venderVehiculo(id: number) {
    this.router.navigate([`/ventas/nuevo/${id}`])
  }

  abrirModal(vehiculoId: number) {
    this.dialog.open(AsignarTallerModal, {
      width: "400px",
      data: { vehiculoId }
    }).afterClosed().subscribe(resultado => {
      if (resultado === true)//tiene que coincidir con lo que le pasamos al dialogRef.close() del modal
      {
        this.router.navigate(['/vehiculos'])
      }
    })
  }
}