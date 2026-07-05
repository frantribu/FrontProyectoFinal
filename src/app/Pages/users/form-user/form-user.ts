import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsuarioRequest } from '../../../Core/Models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.html',
  styleUrl: './form-user.css',
})
export class FormUser {
  private fb = inject(FormBuilder);
  private userService = inject(UsuarioService);
  private router = inject(Router);

  roles = toSignal(this.userService.getRoles(), { initialValue: [] })

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni:[0, [Validators.required, Validators.min(1)]],
    rol: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  })

  agregarAuto() {
    const formulario = this.form.getRawValue();

    const request: UsuarioRequest = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      dni: formulario.dni,
      rol: formulario.rol,
      email: formulario.email,
      password: formulario.password,
    }

    this.userService.postUser(request).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (e) => console.log("No se puedo crear el usuario", e)
    })
  }
}
