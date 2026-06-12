import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UsuarioResponse } from '../../Models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = "http://localhost:8080/usuarios";
  private http=inject(HttpClient);
  private token=localStorage.getItem("authToken");

  getEncargados(){
    return this.http.get<UsuarioResponse[]>(this.url + "/encargados", {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    })
  }

}
