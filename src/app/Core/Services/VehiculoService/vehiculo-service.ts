import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CrearVehiculoRequest, Submodelo, VehiculoResponse } from '../../Models/Vehiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private url= "http://localhost:8080/vehiculos"
  private http=inject(HttpClient)
  private token=localStorage.getItem("authToken")

  getVehiculos():Observable<VehiculoResponse[]>{
    return this.http.get<VehiculoResponse[]>(this.url, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getMarcas(tipo:String):Observable<String[]>{
    return this.http.get<String[]>(this.url + `/marcas?tipo=${tipo}`, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getModelos(tipo:String, marca:String):Observable<String[]>{
    return this.http.get<String[]>(this.url + `/modelos?tipo=${tipo}&make=${marca}`, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getAnios(tipo:String, modelo:String):Observable<number[]>{
    return this.http.get<number[]>(this.url + `/anios?tipo=${tipo}&model=${modelo}`, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    });
  }

   getSubmodelos(modelo:String, anio:number):Observable<Submodelo[]>{
    return this.http.get<Submodelo[]>(this.url + `/submodelos?model=${modelo}&year=${anio}`, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  agregarAuto(request:CrearVehiculoRequest){
    return this.http.post(this.url + `/autos`, request, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    });
  }

}
