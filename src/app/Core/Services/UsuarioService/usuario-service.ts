import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol, Usuario } from '../../Models/Usuario';
import { Observable } from 'rxjs';
import { UsuarioRequest } from '../../Models/UsuarioRequest';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService{
  private url = "http://localhost:8080/usuarios"
  private http = inject(HttpClient);
  private token = localStorage.getItem("authToken")

  getAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  getUserById(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  createUser(user: UsuarioRequest): Observable<Usuario>{
    return this.http.post<Usuario>(this.url, user, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  patchUser(id: number, user: Partial<Usuario>){
    return this.http.patch(`${this.url}/${id}`, user, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  deleteUser(id: number){
    this.http.delete(`${this.url}/${id}`, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  getRoles(){
    return this.http.get<Rol[]>(this.url + "/roles", {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  




}
