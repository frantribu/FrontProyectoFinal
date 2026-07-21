import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoReparacion, HistorialReparacionResponse } from '../../Models/HistorialReparacion';

@Injectable({
  providedIn: 'root',
})
export class ReparacionService {
  private url = "http://localhost:8080/historial/reparaciones"; 
  private http = inject(HttpClient);

  agregarReparacion(request: any) {
    return this.http.post(this.url, request);
  }

  getReparacionesPorTaller(idTaller: number): Observable<HistorialReparacionResponse[]> {
    return this.http.get<HistorialReparacionResponse[]>(`${this.url}/taller/${idTaller}`);
  }

  cambiarEstado(id:number, estadoReparacion:EstadoReparacion){
    return this.http.patch(`${this.url}/${id}/estado`, {estadoReparacion})
  }

  getReparacionesActivas(){
    return this.http.get<number>(`${this.url}/reparacionesActivas`);
  }
}