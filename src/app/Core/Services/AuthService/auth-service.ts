import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../Models/Login';
import { Observable, tap } from 'rxjs';
import { UsuarioResponse } from '../../Models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = "http://localhost:8080/auth/login";
  private tokenKey="authToken";
  private userKey="userToken";

  private http = inject(HttpClient);
  private router = inject(Router);

  login(loginRequest: LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.url, loginRequest).pipe(
      tap(response=>{
        if(response){
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.usuario));
        }
      })
    )
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
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login'])
  }

  getUser():UsuarioResponse | null{
    const data= localStorage.getItem(this.userKey);
    return data ? JSON.parse(data):null
  }

  getNombreCompleto(){
    const user= this.getUser();
    return user ? `${user.nombre.toLowerCase()} ${user.apellido.toLowerCase()}`:''
  }

  getRol(){
    const user=this.getUser();
    return user ? `${user.rol}`:''
  }

  isAdmin():boolean{
    return this.getRol().toLowerCase()==="admin";
  }

  isEncargado():boolean{
    return this.getRol().toLowerCase()==="encargadotaller"
  }

  isEmpleado():boolean{
    return this.getRol().toLowerCase()==="empleado"
  }

  actualizarUsuario(usuario: UsuarioResponse) {
    localStorage.setItem(this.userKey, JSON.stringify(usuario));
}

}