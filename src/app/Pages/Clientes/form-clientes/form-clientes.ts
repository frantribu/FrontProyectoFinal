import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../Core/Services/ClienteService/cliente-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidacionService } from '../../../Core/Services/ValidacionService/validacionService';
import { ClienteRequest } from '../../../Core/Models/Cliente';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form-clientes',
  imports: [ReactiveFormsModule],
  templateUrl: './form-clientes.html',
  styleUrl: './form-clientes.css',
})
export class FormClientes {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder)
  private clienteService = inject(ClienteService)
  private router = inject(Router)
  private validacionesService = inject(ValidacionService);

  errorEmail = signal<string>("");
  errorDni = signal<string>("");
  dniOriginal = signal<number>(0);
  emailOriginal = signal<string>("");

  id = Number(this.route.snapshot.paramMap.get("id"));
  isEditable = this.id ? true : false;

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: [0, [
      Validators.required,
      Validators.pattern(/^\d{7,8}$/)
    ]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+]?[0-9\s\-]{8,15}$/)]]
  })

  constructor() {
    if (this.isEditable) {
      this.cargarCliente();
    }
  }

  agregarCliente() {
    const formulario = this.form.getRawValue();

    const request: ClienteRequest = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      dni: formulario.dni,
      email: formulario.email,
      telefono: formulario.telefono,
    }

    this.clienteService.crearCliente(request).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: (e) => console.log("No se pudo crear el cliente", e)
    })
  }

  cargarCliente() {
    this.clienteService.getClienteById(this.id).subscribe({
      next: (c) => {

        this.dniOriginal.set(c.dni);
        this.emailOriginal.set(c.email);

        this.form.patchValue({
          nombre: c.nombre,
          apellido: c.apellido,
          dni: c.dni,
          email: c.email,
          telefono: c.telefono
        })
      },
      error: (e) => {
        if (e.status == 404) {
          this.router.navigate(['/clientes'])
        }
      }
    })
  }

  modificarCliente() {
    if (this.form.invalid) return;

    const formulario = this.form.getRawValue();

    const request: ClienteRequest = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      dni: formulario.dni,
      telefono: formulario.telefono,
      email: formulario.email
    }

    this.clienteService.modificarCliente(request, this.id).subscribe({
      next:()=>this.router.navigate(["/clientes"]),
      error:()=>console.log("Error al modificar el cliente")
    })
  }

  onSubmit(){
    if(this.isEditable){
      this.modificarCliente();
    }else{
      this.agregarCliente();
    }
  }

  validarEmail(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!value) return;

    this.validacionesService.validarEmail(value).subscribe({
      next: (existe) => {
        this.errorEmail.set(existe && value != this.emailOriginal() ? "El correo electronico ya esta registrado" : '')
      },
      error: () => console.log("Error al validar el email")
    })
  }

  validarDni(event: Event) {
    const value = Number((event.target as HTMLInputElement).value.trim());

    if (!value) return;

    this.validacionesService.validarDni(value).subscribe({
      next: (existe) => {
        this.errorDni.set(existe && value != this.dniOriginal() ? "El DNI ya esta registrado" : '')
      },
      error: () => console.log("Error al validar el dni")
    })
  }
}
