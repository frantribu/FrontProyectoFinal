import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/AuthService/auth-service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../Core/Models/Login';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  ocultar = true;
  errorMensaje=signal<string>('');

  loginRequest = signal<LoginRequest>({
    email: '',
    password: ''
  })

  formLogin = form(this.loginRequest, (campo) => {
    required(campo.email, { message: "El email es obligatorio" });
    required(campo.password, { message: "La contraseña es obligatoria" });
    email(campo.email, { message: "El email no tiene el formato correcto" })
  })

  login(event:Event) {
    event.preventDefault();
    
    if (this.formLogin().valid()) {
      this.authService.login(this.formLogin().value()).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (e) => {
          if(e.status===401){
            this.errorMensaje.set("Credenciales incorrectas")
          }else if(e.status===403){
            this.errorMensaje.set("Usuario desactivado")
          }else{
            this.errorMensaje.set("Error")
          }
        }
      })
    }
  }

  togglePassword() {
    this.ocultar = !this.ocultar
  }

}
