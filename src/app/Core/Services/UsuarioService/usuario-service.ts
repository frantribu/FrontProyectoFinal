import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol, Usuario } from '../../Models/Usuario';
import { Observable } from 'rxjs';
import { UsuarioRequest } from '../../Models/UsuarioRequest';


@Injectable({
  providedIn: 'root',
})

export class UsuarioService {
  private url = "http://localhost:8080/usuarios"
  private http = inject(HttpClient);
  private token = localStorage.getItem("authToken");

  getEncargados() {
    return this.http.get<Usuario[]>(this.url + "/encargados", {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  getAll(activo: Boolean | null) {
    if (activo == null) {
      return this.http.get<Usuario[]>(this.url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
    }else{
       return this.http.get<Usuario[]>(`${this.url}?activo=${activo}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
    }

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

  deleteUser(id: number) {
    this.http.delete(`${this.url}/${id}`)
  }

  getRoles(){
    return this.http.get<Rol[]>(this.url + "/roles", {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }
}
