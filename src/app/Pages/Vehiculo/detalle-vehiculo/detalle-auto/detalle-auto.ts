import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../../../Core/Services/VehiculoService/vehiculo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutoDetalleResponse } from '../../../../Core/Models/Auto';
import { AuthService } from '../../../../Core/Services/AuthService/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { AsignarTallerModal } from '../../../../Core/Components/asignar-taller-modal/asignar-taller-modal';

@Component({
  selector: 'app-detalle-auto',
  imports: [CommonModule],
  templateUrl: './detalle-auto.html',
  styleUrl: './detalle-auto.css',
})
export class DetalleAuto {
  private vehiculoService = inject(VehiculoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  authService = inject(AuthService);
  baseUrl = "http://localhost:8080/ImagenesVehiculo/";

  auto = signal<AutoDetalleResponse | null>(null);
  loading = signal<boolean>(false);
  indiceImagen = signal<number>(0);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.cargarVehiculo(id);
  }

  cargarVehiculo(id: number) {
    this.loading.set(true);
    this.vehiculoService.getDetalleAuto(id).subscribe({
      next: (v) => {
        this.auto.set(v)
        this.loading.set(false)
      },
      error: (e) => {
        if (e.status === 403) {
          this.router.navigate(['/vehiculos'])
        } else {
          console.log("Error al cargar el auto: ", e);
        }
        this.loading.set(false)
      }
    })
  }

  anterior() {
    if (this.indiceImagen() > 0) {
      this.indiceImagen.set(this.indiceImagen() - 1);
    } else {
      this.indiceImagen.set(this.auto()!.imagenes!.length - 1);
    }
  }

  siguiente() {
    if (this.indiceImagen() < this.auto()!.imagenes!.length - 1) {
      this.indiceImagen.set(this.indiceImagen() + 1);
    } else {
      this.indiceImagen.set(0);
    }
  }

  irAImagen(index: number) {
    this.indiceImagen.set(index);
  }

  editarAuto(id: number) {
    this.router.navigate([`/vehiculos/auto/${id}/editar`])
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
