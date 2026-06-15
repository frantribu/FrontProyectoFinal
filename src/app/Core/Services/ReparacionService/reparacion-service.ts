import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// Definimos la interfaz del Request basada en tu DTO de Java justo arriba
export interface CrearReparacionRequest {
  idTaller: number;
  idVehiculo: number;
  fechaDeEntrada: string; // Viaja como string en formato YYYY-MM-DD
  fechaDeSalida: string | null;
  descripcion: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReparacionService {
 
  private url = "http://localhost:8080/api/reparaciones"; 
  private http = inject(HttpClient);
  private token = localStorage.getItem("authToken");

  agregarReparacion(request: CrearReparacionRequest) {
    return this.http.post(this.url, request, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}