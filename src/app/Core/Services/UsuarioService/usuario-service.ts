import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioResponse } from '../../Models/Usuario';

@Injectable({
  providedIn: 'root',
}) 

export class UsuarioService{
  private url = "http://localhost:8080/usuarios"
  private http = inject(HttpClient);
  private token=localStorage.getItem("authToken");

   getEncargados(){
    return this.http.get<UsuarioResponse[]>(this.url + "/encargados", {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  getAll(){
    return this.http.get<UsuarioResponse[]>(this.url)
  }

  getUserById(id:number){
    return this.http.get<UsuarioResponse>(`${this.url}/${id}`)
  }

  postUser(user: Partial<UsuarioResponse>){
    return this.http.post(this.url, user)
  }

  patchUser(id: number, user: Partial<UsuarioResponse>){
    return this.http.patch(`${this.url}/${id}`, user)
  }

  deleteUser(id: number){
    this.http.delete(`${this.url}/${id}`)
  }
}
