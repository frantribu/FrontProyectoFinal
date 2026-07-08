import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse, CrearClienteRequest } from '../../Models/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http=inject(HttpClient);
  private url= "http://localhost:8080/clientes";

  getClientes(activo:boolean, busqueda:string):Observable<ClienteResponse[]>{
    return this.http.get<ClienteResponse[]>(`${this.url}?activo=${activo}&busqueda=${busqueda}`)
  }

  crearCliente(request:CrearClienteRequest):Observable<ClienteResponse>{
    return this.http.post<ClienteResponse>(this.url, request)
  }
}
