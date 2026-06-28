import { Component, input, signal } from '@angular/core';
import { HistorialReparacionResponse } from '../../Core/Models/HistorialReparacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-historial-reparacion',
  imports: [CommonModule],
  templateUrl: './card-historial-reparacion.html',
  styleUrl: './card-historial-reparacion.css',
})
export class CardHistorialReparacion {
  reparacion=input<HistorialReparacionResponse>();

  mostrarMotivo=signal(false);

  toggleMotivo(){
    this.mostrarMotivo.set(!this.mostrarMotivo())
  }
}
