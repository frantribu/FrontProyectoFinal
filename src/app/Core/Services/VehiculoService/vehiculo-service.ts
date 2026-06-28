import { HttpClient, } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoDetalleResponse, CrearAutoRequest, Submodelo } from '../../Models/Auto';
import { VehiculoResponse } from '../../Models/Vehiculo';
import { CrearMotoRequest, MotoDetalleResponse } from '../../Models/Moto';
import { CrearVentaRequest } from '../../Models/Venta';
import { EnumResponse } from '../../Models/Enum';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private url = "http://localhost:8080/vehiculos"
  private http = inject(HttpClient)

  /*--------------------------------------------------------VEHICULOS-----------------------------------------------------------------------------------*/

  getVehiculos(estado: string): Observable<VehiculoResponse[]> {
    return this.http.get<VehiculoResponse[]>(`${this.url}?estado=${estado}`);
  }

  getDetalleVehiculo(id: number): Observable<VehiculoResponse> {
    return this.http.get<VehiculoResponse>(this.url + `/${id}`)
  } 

  getDetalleAuto(id: number): Observable<AutoDetalleResponse> {
    return this.http.get<AutoDetalleResponse>(this.url + `/${id}`);
  }

  getDetalleMoto(id: number): Observable<MotoDetalleResponse> {
    return this.http.get<MotoDetalleResponse>(this.url + `/${id}`);
  }

  agregarVenta(vehiculoId:number,request:CrearVentaRequest){
      return this.http.put(`${this.url}/vender/${vehiculoId}`, request)
    }

  getMarcas(tipo: String): Observable<String[]> {
    return this.http.get<String[]>(this.url + `/marcas?tipo=${tipo}`);
  }

  getModelos(tipo: String, marca: String): Observable<String[]> {
    return this.http.get<String[]>(this.url + `/modelos?tipo=${tipo}&make=${marca}`);
  }

  getAnios(tipo: String, modelo: String): Observable<number[]> {
    return this.http.get<number[]>(this.url + `/anios?tipo=${tipo}&model=${modelo}`);
  }

  getSubmodelos(modelo: String, anio: number): Observable<Submodelo[]> {
    return this.http.get<Submodelo[]>(this.url + `/submodelos?model=${modelo}&year=${anio}`);
  }

  getEstados(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(this.url + "/estados")
  }

  /*------------------------------------------AUTO----------------------------------------------------*/

  agregarAuto(auto: CrearAutoRequest, imagenes: File[]): Observable<AutoDetalleResponse> {
    const form = new FormData();
    form.append('datos', new Blob([JSON.stringify(auto)], { type: 'application/json' }));
    imagenes.forEach(img => form.append('files', img));
    return this.http.post<AutoDetalleResponse>(this.url + `/autos`, form);
  }

  modificarAuto(id: number, auto: CrearAutoRequest): Observable<AutoDetalleResponse> {
    return this.http.put<AutoDetalleResponse>(this.url + `/autos/${id}`, auto)
  }

  /*------------------------------------------MOTO----------------------------------------------------*/

  agregarMoto(moto: CrearMotoRequest, imagenes: File[]): Observable<MotoDetalleResponse> {
    const form = new FormData();
    form.append('datos', new Blob([JSON.stringify(moto)], { type: 'application/json' }));
    imagenes.forEach(img => form.append('files', img));
    return this.http.post<MotoDetalleResponse>(this.url + "/motos", form)
  }

  modificarMoto(id:number, request:CrearMotoRequest):Observable<MotoDetalleResponse>{
    return this.http.put<MotoDetalleResponse>(`${this.url}/motos/${id}`, request);
  }

  obtenerTiposMoto() {
    return this.http.get<EnumResponse[]>(this.url + `/tipos-moto`)
  }

  eliminarVehiculo(id: number) {
    return this.http.delete(this.url + `/${id}`)
  }


}
