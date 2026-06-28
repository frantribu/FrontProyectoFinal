import { HttpClient } from '@angular/common/http';
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

  getVentas(): Observable<VentaResponse[]> {
    if (this.authService.isAdmin()) {
      return this.http.get<VentaResponse[]>(this.url);
    } else if (this.authService.isEmpleado()) {
      return this.http.get<VentaResponse[]>(`${this.url}/mis-ventas`);
    }

    return EMPTY;
  }

  ventasTotales(): Observable<number> {
    return this.http.get<number>(`${this.url}/cantidad`);
  }


}
