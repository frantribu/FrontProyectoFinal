import { Component, input } from '@angular/core';
import { HistorialReparacionResponse } from '../../Core/Models/HistorialReparacion';

@Component({
  selector: 'app-card-historial-reparacion',
  imports: [],
  templateUrl: './card-historial-reparacion.html',
  styleUrl: './card-historial-reparacion.css',
})
export class CardHistorialReparacion {
  reparacion=input<HistorialReparacionResponse>();

}
