import { Component, inject, signal } from '@angular/core';
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

  errorEmail=signal<string>("");
  errorDni=signal<string>("");

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: [0, [
      Validators.required,
      Validators.pattern(/^\d{7,8}$/)
    ]],
    rol: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
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

  validarEmail(event:Event){
    const value=(event.target as HTMLInputElement).value;
    const emailLimpio=value.trim().toLowerCase();

    this.userService.validarEmail(emailLimpio).subscribe({
      next:(existe)=>{
        if(existe){
          this.errorEmail.set("El correo electronico ya esta registrado")
        }else{
          this.errorEmail.set("")
        }
      },
      error:()=>console.log("Error al validar el email")
    })
  }

  validarDni(event:Event){
    const value=(event.target as HTMLInputElement).value;
    const dniLimpio=value.trim();

    this.userService.validarDni(dniLimpio).subscribe({
      next:(existe)=>{
        if(existe){
          this.errorDni.set("El DNI ya esta registrado")
        }else{
          this.errorDni.set("")
        }
      },
      error:()=>console.log("Error al validar el dni")
    })
  }
}
