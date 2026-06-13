import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../../Core/Services/VehiculoService/vehiculo-service';
import { VehiculoResponse } from '../../../Core/Models/Vehiculo';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Core/Services/AuthService/auth-service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule, RouterLink],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css',
})
export class Vehiculos {
  private vehiculoService = inject(VehiculoService);
  private authService = inject(AuthService);
  private router = inject(Router)

  rol = this.authService.getRol();

  vehiculos = signal<VehiculoResponse[]>([])

  constructor() {
    this.getVehiculos();
  }

  getVehiculos() {
    this.vehiculoService.getVehiculos().subscribe({
      next: (v) => this.vehiculos.set(v),
      error: (err) => console.log(err)
    })
  }

  eliminarVehiculo(id: number) {
    const resultado = confirm("Estas seguro que queres eliminar este vehiculo?");

    if (resultado) {
      this.vehiculoService.eliminarVehiculo(id).subscribe({
        next: () => {
          this.vehiculos.update(listaVehiculos =>
            listaVehiculos.filter(v => v.id !== id)
          )
        },
        error: (e) => {
          console.log("Error al eliminar el vehiculo: ", e);

          alert("Error al eliminar el vehiculo")
        }
      })
    }

  }

  verDetalle(vehiculo: VehiculoResponse) {
    if (vehiculo.tipo.toLowerCase() == "auto") {
      this.router.navigate(['/vehiculos/auto/', vehiculo.id])
    } else {
      this.router.navigate(['/vehiculos/moto/', vehiculo.id])
    }
  }

  modificarVehiculo(vehiculo: VehiculoResponse) {
    if (vehiculo.tipo.toLowerCase() == "auto") {
      this.router.navigate([`/vehiculos/auto/${vehiculo.id}/editar`])
    } else {
      this.router.navigate([`/vehiculos/moto/${vehiculo.id}/editar`])
    }
  }

}
