import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../Models/LoginRequest';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../Models/LoginResponse';
import { UsuarioResponse } from '../../Models/UsuarioResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = "http://localhost:8080/auth/login";
  private tokenKey="authToken";

  private http = inject(HttpClient);
  private router = inject(Router);

  usuarioR = signal<UsuarioResponse | null>(null);

  login(loginRequest: LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.url, loginRequest).pipe(
      tap(response=>{ // el tap hace efecto secundarios sin modificar la respuesta
        if(response){
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    )
  }

  getUserLogued():Observable<UsuarioResponse>{

    const token=this.getToken();

    return this.http.get<UsuarioResponse>("http://localhost:8080/auth/logued",
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  loadUser(){
    const token=this.getToken();

    if(!token)return;

    this.getUserLogued().subscribe({
      next: usuario=>{
        this.usuarioR.set(usuario);
      },
      error: ()=>{
        this.logout();
      }
    })
  }

  private getToken():string | null{
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated():boolean{
    const token = this.getToken();

    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1])); /*El atob es para decodificar la cadena de base64*/ 
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login'])
  }

}
