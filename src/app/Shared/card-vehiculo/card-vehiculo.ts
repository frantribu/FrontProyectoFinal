import { Component, input } from '@angular/core';
import { VehiculoResponse } from '../../Core/Models/Vehiculo';

@Component({
  selector: 'app-card-vehiculo',
  imports: [],
  templateUrl: './card-vehiculo.html',
  styleUrl: './card-vehiculo.css',
})
export class CardVehiculo {
  vehiculo=input<VehiculoResponse>();
}
