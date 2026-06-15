import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CrearVentaRequest } from '../../Models/Venta';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private url="http://localhost:8080/historial/ventas";
  private http=inject(HttpClient);
  private token=localStorage.getItem("authToken")

  agregarVenta(request:CrearVentaRequest){
    return this.http.post(this.url, request, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }
}
