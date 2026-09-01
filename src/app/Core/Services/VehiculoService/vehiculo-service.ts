import { HttpClient, } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoDetalleResponse, CrearAutoRequest, Submodelo } from '../../Models/Auto';
import { VehiculoDetalleResponse, VehiculoResponse } from '../../Models/Vehiculo';
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

  getVehiculos(estado: string, buscador:string): Observable<VehiculoResponse[]> {
    return this.http.get<VehiculoResponse[]>(`${this.url}?estado=${estado}&busqueda=${buscador}`);
  }

  getDetalleVehiculo(id: number): Observable<VehiculoDetalleResponse> {
    return this.http.get<VehiculoDetalleResponse>(this.url + `/${id}`)
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

  validarPatente(patente:string){
    return this.http.get<boolean>(`${this.url}/validarPatente/${patente}`);
  }

  countVehiculosDisponibles():Observable<number>{
    return this.http.get<number>(`${this.url}/cantidadDisponible`);
  }

  /*------------------------------------------AUTO----------------------------------------------------*/

  agregarAuto(auto: CrearAutoRequest, imagenes: File[]): Observable<AutoDetalleResponse> {
    const form = new FormData();
    form.append('datos', new Blob([JSON.stringify(auto)], { type: 'application/json' }));
    imagenes.forEach(img => form.append('files', img));
    return this.http.post<AutoDetalleResponse>(this.url + `/autos`, form);
  }

  modificarAuto(id: number, imagenes: File[], auto: CrearAutoRequest): Observable<AutoDetalleResponse> {
    const form = new FormData();
    form.append('datos', new Blob([JSON.stringify(auto)], { type: 'application/json' }));
    imagenes.forEach(img => form.append('files', img));

    return this.http.put<AutoDetalleResponse>(this.url + `/autos/${id}`, form)
  }

  /*------------------------------------------MOTO----------------------------------------------------*/

  agregarMoto(moto: CrearMotoRequest, imagenes: File[]): Observable<MotoDetalleResponse> {
    const form = new FormData();
    form.append('datos', new Blob([JSON.stringify(moto)], { type: 'application/json' }));
    imagenes.forEach(img => form.append('files', img));
    
    return this.http.post<MotoDetalleResponse>(this.url + "/motos", form)
  }

  modificarMoto(id:number, imagenes: File[], request:CrearMotoRequest):Observable<MotoDetalleResponse>{
    const form = new FormData();
    form.append('datos', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    imagenes.forEach(img => form.append('files', img));

    return this.http.put<MotoDetalleResponse>(`${this.url}/motos/${id}`, form);
  }

  obtenerTiposMoto() {
    return this.http.get<EnumResponse[]>(this.url + `/tipos-moto`)
  }

  eliminarVehiculo(id: number) {
    return this.http.delete(this.url + `/${id}`)
  }

  /*------------------------------------------IMAGENES----------------------------------------------------*/

  eliminarImagen(id:number, nombre:string){
    return this.http.delete(`${this.url}/${id}/imagenes?nombre=${nombre}`,{
      responseType: 'text'
    })
  }
}
