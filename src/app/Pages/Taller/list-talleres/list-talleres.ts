import { Component, inject, signal } from '@angular/core';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';
import { TallerResponse } from '../../../Core/Models/Taller';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-talleres',
  imports: [RouterLink],
  templateUrl: './list-talleres.html',
  styleUrl: './list-talleres.css',
})
export class ListTalleres {
  private tallerService=inject(TallerService);

  talleres=signal<TallerResponse[]>([]);

  constructor(){
    this.getTalleres();
  }

  getTalleres(){
    this.tallerService.getTalleres().subscribe({
      next:(t)=>this.talleres.set(t),
      error:(e)=>console.log("Error al cargar los talleres: ", e)
    })
  }
}
