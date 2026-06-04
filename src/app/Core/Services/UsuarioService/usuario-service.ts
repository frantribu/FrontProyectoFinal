import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioResponse } from '../../Models/UsuarioResponse';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService{
  private url = "http://localhost:8080/users"
  private http = inject(HttpClient);

  getAll(){
    return this.http.get<UsuarioResponse[]>(this.url);
  }




}
