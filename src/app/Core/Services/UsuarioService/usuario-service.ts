import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateUsuarioRequest, UsuarioRequest, UsuarioResponse } from '../../Models/Usuario';
import { Observable } from 'rxjs';
import { EnumResponse } from '../../Models/Enum';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {
  private url = "http://localhost:8080/usuarios"
  private http = inject(HttpClient);

  getAll(activo: string) {
       return this.http.get<UsuarioResponse[]>(`${this.url}?activo=${activo}`)
  }

  getUserById(id: number) {
    return this.http.get<UsuarioResponse>(`${this.url}/${id}`)
  }

   getEncargados(buscador:string) {
    return this.http.get<UsuarioResponse[]>(`${this.url}/encargados?buscador=${buscador}`);
  }

   getEmpleados() {
    return this.http.get<UsuarioResponse[]>(this.url + "/empleados")
  }

  modificarUsuario(request:UpdateUsuarioRequest, id:number): Observable<UsuarioResponse>{
    return this.http.put<UsuarioResponse>(`${this.url}/${id}`, request);
  }

  postUser(user: UsuarioRequest) {
    return this.http.post<UsuarioResponse>(this.url, user)
  }

  activarUsuario(id: number) {
    return this.http.patch(`${this.url}/${id}/activar`, {})
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  getRoles():Observable<EnumResponse[]>{
    return this.http.get<EnumResponse[]>(this.url + "/roles")
  }


}
