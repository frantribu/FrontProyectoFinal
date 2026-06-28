import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';
import { TallerDetalleResponse } from '../../../Core/Models/Taller';
import { AuthService } from '../../../Core/Services/AuthService/auth-service';
import { CardHistorialReparacion } from '../../../Shared/card-historial-reparacion/card-historial-reparacion';

@Component({
  selector: 'app-detalle-taller',
  imports: [RouterLink, CardHistorialReparacion],
  templateUrl: './detalle-taller.html',
  styleUrl: './detalle-taller.css',
})
export class DetalleTaller {
  private route = inject(ActivatedRoute);
  private tallerService = inject(TallerService);
  private router=inject(Router);

  authService=inject(AuthService);

  taller = signal<TallerDetalleResponse | null>(null);
  vistaActual = signal<'activas' | 'finalizadas'>('activas');

  reparacionesActivas=computed(()=>
    this.taller()?.historialReparaciones.filter(r=>r.estadoReparacion.name!="ENTREGADO")
  );

  reparacionesFinalizadas=computed(()=>
    this.taller()?.historialReparaciones.filter(r=>r.estadoReparacion.name=="ENTREGADO")
  );

  reparacionesVisibles = computed(() =>
    this.vistaActual() == "activas" ?
      this.reparacionesActivas() : this.reparacionesFinalizadas()
  );

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.cargarTaller(id);
  }

  cargarTaller(id: number) {
    this.tallerService.getDetalleTaller(id).subscribe({
      next: (t) => this.taller.set(t),
      error: (e) => {
        if(e.status===403){
          this.router.navigate([`${this.authService.isAdmin() ? '/talleres' : '/mis-talleres'}`])
        }else{
          console.log("Error al cargar el taller: ", e);
        }
      }
    })
  }

  cambiarVista(vista:'activas'|'finalizadas'){
    this.vistaActual.set(vista);
  }


}
