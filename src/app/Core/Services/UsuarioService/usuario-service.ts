import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioResponse } from '../../Models/Usuario';
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

   getEncargados() {
    return this.http.get<UsuarioResponse[]>(this.url + "/encargados")
  }

   getEmpleados() {
    return this.http.get<UsuarioResponse[]>(this.url + "/empleados")
  }

  postUser(user: Partial<UsuarioResponse>) {
    return this.http.post(this.url, user)
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
