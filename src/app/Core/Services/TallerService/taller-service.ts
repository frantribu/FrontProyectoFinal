import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignarTallerRequest, CrearTallerRequest, TallerDetalleResponse, TallerResponse } from '../../Models/Taller';
import { EnumResponse } from '../../Models/Enum';

@Injectable({
  providedIn: 'root',
})
export class TallerService {
  private url = "http://localhost:8080/taller";
  private http = inject(HttpClient);

  getTalleres(activo:string): Observable<TallerResponse[]> {
    return this.http.get<TallerResponse[]>(`${this.url}?activo=${activo}`)
  }

  getDetalleTaller(id:number):Observable<TallerDetalleResponse>{
    return this.http.get<TallerDetalleResponse>(`${this.url}/${id}`)
  }

  getTalleresPorEncargado():Observable<TallerResponse[]>{
    return this.http.get<TallerResponse[]>(`${this.url}/mis-talleres`)
  }

  crearTaller(request: CrearTallerRequest): Observable<TallerDetalleResponse> {
    return this.http.post<TallerDetalleResponse>(this.url, request)
  }

  desactivarTaller(idTaller:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${idTaller}`)
  }

  reactivarTaller(idTaller:number):Observable<void>{
    return this.http.patch<void>(`${this.url}/${idTaller}/activar`, {})
  }

  asignarVehiculo(request: AsignarTallerRequest) {
    return this.http.post(`${this.url}/asignar-vehiculo`, request)
  }

  obtenerEspecialidades(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(this.url + "/especialidades")
  }
}
