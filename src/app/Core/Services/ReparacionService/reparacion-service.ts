import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EstadoReparacion, HistorialReparacionResponse } from '../../Models/HistorialReparacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReparacionService {
  private url = "http://localhost:8080/historial/reparaciones"; 
  private http = inject(HttpClient);

  getReparaciones():Observable<HistorialReparacionResponse[]>{
    return this.http.get<HistorialReparacionResponse[]>(this.url);
  }

  cambiarEstado(id:number, estadoReparacion:EstadoReparacion){
    return this.http.patch(`${this.url}/${id}/estado`, {estadoReparacion})
  }

  getReparacionesActivas(){
    return this.http.get<number>(`${this.url}/reparacionesActivas`);
  }
}