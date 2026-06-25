import { Component, inject, signal } from '@angular/core';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';
import { TallerResponse } from '../../../Core/Models/Taller';
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-talleres',
  imports: [],
  templateUrl: './list-talleres.html',
  styleUrl: './list-talleres.css',
})
export class ListTalleres {
  private tallerService=inject(TallerService);
  private router=inject(Router);

  activo=signal<string>("");
  talleres=signal<TallerResponse[]>([]);

  constructor(){
    this.getTalleres();
  }

  getTalleres(){
    this.tallerService.getTalleres(this.activo()).subscribe({
      next:(t)=>this.talleres.set(t),
      error:(e)=>console.log("Error al cargar los talleres: ", e)
    })
  }

  desactivarTaller(idTaller:number){
    this.tallerService.desactivarTaller(idTaller).subscribe({
      next:()=>this.getTalleres(),
      error:(e)=>console.log("Error al desactivar el taller")
    })
  }

  reactivarTaller(idTaller:number){
    this.tallerService.reactivarTaller(idTaller).subscribe({
      next:()=>this.getTalleres(),
      error:(e)=>console.log("Error al reactivar el taller")
    })
  }

  onEstadoChange(event:Event){
    const value=(event.target as HTMLSelectElement).value;
    this.activo.set(value);
    this.getTalleres();
  }

  verDetalle(id:number){
    this.router.navigate([`/talleres/${id}`])
  }

}
