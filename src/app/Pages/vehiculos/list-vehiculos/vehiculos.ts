import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../../Core/Services/VehiculoService/vehiculo-service';
import { VehiculoResponse } from '../../../Core/Models/VehiculoResponse';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Core/Services/AuthService/auth-service';

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css',
})
export class Vehiculos {
  private vehiculoService=inject(VehiculoService);
  private authService=inject(AuthService);

  rol=this.authService.getRol();

  vehiculos=signal<VehiculoResponse[]>([])

  constructor(){
    this.getVehiculos();
  }

  getVehiculos(){
    this.vehiculoService.getVehiculos().subscribe({
      next:(v)=>this.vehiculos.set(v),
      error:(err)=>console.log(err)
    })
  }

}
