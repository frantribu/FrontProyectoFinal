import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';
import { TallerDetalleResponse } from '../../../Core/Models/Taller';

@Component({
  selector: 'app-detalle-taller',
  imports: [],
  templateUrl: './detalle-taller.html',
  styleUrl: './detalle-taller.css',
})
export class DetalleTaller {
  private route=inject(ActivatedRoute);
  private tallerService=inject(TallerService);

  taller=signal<TallerDetalleResponse | null>(null);

  constructor(){
    const id=Number(this.route.snapshot.paramMap.get("id"));    
    this.cargarTaller(id);    
  }

  cargarTaller(id:number){
    this.tallerService.getDetalleTaller(id).subscribe({
      next:(t)=>this.taller.set(t),
      error:(e)=>console.log("Error al ver el taller del vehiculo")
    })
  }
}
