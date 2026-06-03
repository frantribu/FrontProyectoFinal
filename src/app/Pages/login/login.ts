import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/AuthService/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)
  ocultar=true

  formLogin = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  login() {
    this.authService.login(this.formLogin.getRawValue()).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (e) => console.log("Login fallido", e)
    })
  }

  togglePassword(){
    this.ocultar=!this.ocultar
  }

}
