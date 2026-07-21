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

    if (fechaDesde && fechaHasta) {
      params = params.set('desde', fechaDesde).set('hasta', fechaHasta);
    }

    if (this.authService.isAdmin()) {
      if (empleadoId) {
        params = params.set('empleadoId', empleadoId);
      }
      
      return this.http.get<VentaResponse[]>(this.url, { params });

    } else if (this.authService.isEmpleado()) {
      return this.http.get<VentaResponse[]>(`${this.url}/mis-ventas`, { params });
    }

    return EMPTY;
  }

 getFacturacionDelMes(): Observable<number> {
    return this.http.get<number>(`${this.url}/facturacion-mes`);
  }

  getVentasDelMes(): Observable<number> {
    return this.http.get<number>(`${this.url}/ventas-mes`);
  }

  getVentasDelMesEmpleado(): Observable<number> {
    return this.http.get<number>(`${this.url}/empleado/ventas-mes`);
  }

  getFacturacionDelMesEmpleado(): Observable<number> {
    return this.http.get<number>(`${this.url}/empleado/facturacion-mes`);
  }

  getUltimasTresVentasEmpleado():Observable<VentaResponse[]>{
    return this.http.get<VentaResponse[]>(`${this.url}/empleado/ultimas-ventas`);
  }
}
