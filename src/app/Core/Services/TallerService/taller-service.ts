import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignarTallerRequest, CrearTallerRequest, Especialidades, TallerDetalleResponse, TallerResponse } from '../../Models/Taller';

@Injectable({
  providedIn: 'root',
})
export class TallerService {
  private url = "http://localhost:8080/taller";
  private http = inject(HttpClient);
  private token = localStorage.getItem("authToken");

  getTalleres(): Observable<TallerResponse[]> {
    return this.http.get<TallerResponse[]>(this.url, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  crearTaller(request: CrearTallerRequest): Observable<TallerDetalleResponse> {
    return this.http.post<TallerDetalleResponse>(this.url, request, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  asignarVehiculo(request: AsignarTallerRequest) {
    return this.http.post(`${this.url}/asignar-vehiculo`, request, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  obtenerEspecialidades(): Observable<Especialidades[]> {
    return this.http.get<Especialidades[]>(this.url + "/especialidades", {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }
}
