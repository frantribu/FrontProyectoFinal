import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface HistorialReparacionResponse {
  id: number;
  vehiculoMarca?: string; 
  vehiculoModelo?: string;  
  vehiculoPatente?: string;
  fechaDeEntrada: string;
  fechaDeSalida: string | null;
  estadoReparacion: string;
  motivo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReparacionService {
  
  private url = "http://localhost:8080/historial/reparaciones"; 
  private http = inject(HttpClient);

 
  private getHeaders() {
    const token = localStorage.getItem("authToken");
    return { Authorization: `Bearer ${token}` };
  }

  agregarReparacion(request: any) {
    return this.http.post(this.url, request, { headers: this.getHeaders() });
  }


  getReparacionesPorTaller(idTaller: number): Observable<HistorialReparacionResponse[]> {
    return this.http.get<HistorialReparacionResponse[]>(`${this.url}/taller/${idTaller}`, {
      headers: this.getHeaders()
    });
  }
}