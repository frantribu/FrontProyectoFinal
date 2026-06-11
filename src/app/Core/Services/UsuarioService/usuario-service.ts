import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioResponse } from '../../Models/UsuarioResponse';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService{
  private url = "http://localhost:8080/usuarios"
  private http = inject(HttpClient);

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
