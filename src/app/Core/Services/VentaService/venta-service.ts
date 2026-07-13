import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { VentaResponse } from '../../Models/Venta';
import { AuthService } from '../AuthService/auth-service';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private url = "http://localhost:8080/ventas";
  private http = inject(HttpClient);
  private authService = inject(AuthService);

getVentas(empleadoId?: string, fechaDesde?: string, fechaHasta?: string): Observable<VentaResponse[]> {
    let params = new HttpParams();

    // 1. Si hay fechas, las agregamos a los parámetros.
    // Esto es genial porque le servirá tanto al Admin como al Empleado regular.
    if (fechaDesde && fechaHasta) {
      params = params.set('desde', fechaDesde).set('hasta', fechaHasta);
    }

    // 2. Evaluamos según el Rol
    if (this.authService.isAdmin()) {
      
      // Si el select mandó un ID válido (es decir, no es el option value="" de "Todos")
      if (empleadoId) {
        params = params.set('empleadoId', empleadoId);
      }
      
      return this.http.get<VentaResponse[]>(this.url, { params });

    } else if (this.authService.isEmpleado()) {
      
      // El empleado llama a su propio endpoint, pero le pasamos los parámetros
      // por si él también quiere filtrar sus propias ventas por fecha.
      // (Asegúrate de que tu backend en /mis-ventas reciba @RequestParam de fechas también)
      return this.http.get<VentaResponse[]>(`${this.url}/mis-ventas`, { params });
    }

    return EMPTY;
  }

  ventasTotales(): Observable<number> {
    return this.http.get<number>(`${this.url}/cantidad`);
  }




}
