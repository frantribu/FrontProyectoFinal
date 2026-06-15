import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private url="http://localhost:8080/historial/ventas";
  private http=inject(HttpClient);
  private token=localStorage.getItem("authToken")

  ventasTotales():Observable<number>{
    return this.http.get<number>(`${this.url}/cantidad`, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }
}
