import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../../Models/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http=inject(HttpClient);
  private url= "http://localhost:8080/clientes";
  private token=localStorage.getItem("authToken");

  getClientes(activo:boolean):Observable<ClienteResponse[]>{
    return this.http.get<ClienteResponse[]>(`${this.url}?activo=${activo}`)
  }
}
