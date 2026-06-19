import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReparacionService, HistorialReparacionResponse } from '../../../Core/Services/ReparacionService/reparacion-service';

@Component({
  selector: 'app-list-reparaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-reparaciones.html',
  styleUrl: './list-reparaciones.css',
})
export class ListReparaciones implements OnInit {
  private reparacionService = inject(ReparacionService);
  
  reparaciones = signal<HistorialReparacionResponse[]>([]);

  ngOnInit(): void {
    
    const idTallerLogueado = localStorage.getItem("idTaller");

    if (idTallerLogueado) {
      this.reparacionService.getReparacionesPorTaller(Number(idTallerLogueado)).subscribe({
        next: (data) => {
          this.reparaciones.set(data);
        },
        error: (err) => console.error("Error al cargar las reparaciones del taller:", err)
      });
    } else {
      console.warn("No se encontró ningún ID de taller en el almacenamiento local.");
    }
  }
}
