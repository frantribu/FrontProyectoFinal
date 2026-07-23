import { Component, inject, signal } from '@angular/core';
import { ReparacionService } from '../../../Core/Services/ReparacionService/reparacion-service';
import { HistorialReparacionResponse } from '../../../Core/Models/HistorialReparacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-reparaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-reparaciones.html',
  styleUrl: './list-reparaciones.css',
})
export class ListReparaciones{
  private reparacionService = inject(ReparacionService);
  
  reparaciones = signal<HistorialReparacionResponse[]>([]);

  constructor(){
    this.getReparaciones();
  }

  getReparaciones(){
    this.reparacionService.getReparaciones().subscribe({
      next:(r)=>this.reparaciones.set(r),
      error:()=>console.log("Error al obtener las reparaciones")
    })
  }  
}
