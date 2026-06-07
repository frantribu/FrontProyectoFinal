import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VehiculoResponse } from '../../Models/VehiculoResponse';
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
}
