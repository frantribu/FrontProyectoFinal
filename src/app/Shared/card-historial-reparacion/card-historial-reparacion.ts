import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { EstadoReparacion, HistorialReparacionResponse } from '../../Core/Models/HistorialReparacion';
import { CommonModule } from '@angular/common';
import { ReparacionService } from '../../Core/Services/ReparacionService/reparacion-service';

@Component({
  selector: 'app-card-historial-reparacion',
  imports: [CommonModule],
  templateUrl: './card-historial-reparacion.html',
  styleUrl: './card-historial-reparacion.css',
})
export class CardHistorialReparacion {
  private reparacionService = inject(ReparacionService);
  reparacion = input<HistorialReparacionResponse>();
  estadoCambiado = output<void>();

  mostrarMotivo = signal(false);

  readonly estados: EstadoReparacion[] = ['INGRESO', 'DIAGNOSTICO', 'REPARACION', 'PRUEBA', 'FINALIZADO', 'ENTREGADO'];

  indiceActual = computed(() => {
    const estado = this.reparacion()?.estadoReparacion.name.trim() as EstadoReparacion;

    if (!estado) return -1;
    return this.estados.indexOf(estado);
  }
  )

  puedeSiguiente = computed(() => this.indiceActual() < this.estados.length - 1);

  puedeAnterior = computed(() => this.indiceActual() > 0)

  avanzarEstado() {
    const siguiente = this.estados[this.indiceActual() + 1];
    if (!siguiente) return;
    this.cambiarEstado(siguiente);
  }

  retrocederEstado() {
    const anterior = this.estados[this.indiceActual() - 1];
    if (!anterior) return;
    this.cambiarEstado(anterior);
  }

  cambiarEstado(estado: EstadoReparacion) {  
    this.reparacionService.cambiarEstado(this.reparacion()!.id, estado).subscribe({
      next: () => this.estadoCambiado.emit(),
      error: () => console.log("Error al cambiar el estado ")
    })
  }

  toggleMotivo() {
    this.mostrarMotivo.set(!this.mostrarMotivo())
  }
}
