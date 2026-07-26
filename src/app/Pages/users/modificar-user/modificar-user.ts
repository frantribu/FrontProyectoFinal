import { Component, inject, signal } from '@angular/core';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionService } from '../../../Core/Services/ValidacionService/validacionService';
import { UpdateUsuarioRequest } from '../../../Core/Models/Usuario';

@Component({
  selector: 'app-modificar-user',
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-user.html',
  styleUrl: './modificar-user.css',
})
export class ModificarUser {
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private validacionService = inject(ValidacionService);
  private router = inject(Router);

  emailOriginal = signal<string>("");
  dniOriginal = signal<number>(0);

  errorEmail = signal<string>("");
  errorDni = signal<string>("");

  id = Number(this.route.snapshot.paramMap.get("id"));

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: [0, [
      Validators.required,
      Validators.pattern(/^\d{7,8}$/)
    ]],
    email: ['', [Validators.required, Validators.email]],
  })

  constructor() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuarioService.getUserById(this.id).subscribe({
      next: (c) => {

        this.emailOriginal.set(c.email);
        this.dniOriginal.set(c.dni);

        this.form.patchValue({
          nombre: c.nombre,
          apellido: c.apellido,
          dni: c.dni,
          email: c.email
        })
      },
      error: (e) => {
        if (e.status == 404) {
          this.router.navigate(['/users'])
        }
      }
    })
  }

  modificarUsuario() {
    if (this.form.invalid) return;

    const formulario = this.form.getRawValue();

    const request: UpdateUsuarioRequest = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      dni: formulario.dni,
      email: formulario.email
    }

    this.usuarioService.modificarUsuario(request, this.id).subscribe({
      next: () => this.router.navigate(['/users'])
    })
  }

  validarDni(event: Event) {
    const value = Number((event.target as HTMLInputElement).value.toLowerCase().trim());

    if (!value) return;

    this.validacionService.validarDni(value).subscribe({
      next: (existe) => {
        this.errorDni.set(existe && value != this.dniOriginal() ? "El DNI ya esta registrado" : '')
      },
      error: () => console.log("Error al validar el DNI")
    })
  }

  validarEmail(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();

    if (!value) return;

    this.validacionService.validarEmail(value).subscribe({
      next: (existe) => {
        this.errorEmail.set(existe && value != this.emailOriginal() ? "El email ya esta registrado" : '')
      },
      error: () => console.log("Error al validar el email")
    })
  }
}

