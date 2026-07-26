import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse, ClienteRequest, ClienteDetalleResponse } from '../../Models/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http=inject(HttpClient);
  private url= "http://localhost:8080/clientes";

  getClientes(activo:string, busqueda:string):Observable<ClienteResponse[]>{
    return this.http.get<ClienteResponse[]>(`${this.url}?activo=${activo}&busqueda=${busqueda}`)
  }

  getClienteById(id:number):Observable<ClienteDetalleResponse>{
      return this.http.get<ClienteDetalleResponse>(`${this.url}/${id}`);
  }

  crearCliente(request:ClienteRequest):Observable<ClienteResponse>{
    return this.http.post<ClienteResponse>(this.url, request)
  }

  modificarCliente(request:ClienteRequest, id:number):Observable<ClienteResponse>{
    return this.http.put<ClienteResponse>(`${this.url}/${id}`, request)
  }
  
  activarCliente(id: number) {
    return this.http.patch(`${this.url}/${id}/activar`, {})
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  contarClientes(){
    return this.http.get<number>(`${this.url}/total`)
  }
}
