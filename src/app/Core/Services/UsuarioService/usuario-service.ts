import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol, Usuario } from '../../Models/Usuario';


@Injectable({
  providedIn: 'root',
})

export class UsuarioService {
  private url = "http://localhost:8080/usuarios"
  private http = inject(HttpClient);

  getEncargados() {
    return this.http.get<Usuario[]>(this.url + "/encargados")
  }

  getAll(activo: string) {
       return this.http.get<Usuario[]>(`${this.url}?activo=${activo}`)
  }

  getUserById(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }

  postUser(user: Partial<Usuario>) {
    return this.http.post(this.url, user)
  }

  patchUser(id: number, user: Partial<Usuario>) {
    return this.http.patch(`${this.url}/${id}`, user)
  }
  activarUsuario(id: number) {
    return this.http.patch(`${this.url}/${id}/activar`, {})
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  getRoles(){
    return this.http.get<Rol[]>(this.url + "/roles")
  }
}
