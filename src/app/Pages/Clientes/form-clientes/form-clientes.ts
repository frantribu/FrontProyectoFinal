import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../Core/Services/ClienteService/cliente-service';
import { Router } from '@angular/router';
import { ValidacionService } from '../../../Core/Services/ValidacionService/validacionService';
import { CrearClienteRequest } from '../../../Core/Models/Cliente';

@Component({
  selector: 'app-form-clientes',
  imports: [ReactiveFormsModule],
  templateUrl: './form-clientes.html',
  styleUrl: './form-clientes.css',
})
export class FormClientes {

  private fb = inject(FormBuilder)
  private clienteService = inject(ClienteService)
  private router = inject(Router)
  private validacionesService=inject(ValidacionService);

  errorEmail=signal<string>("");
  errorDni=signal<string>("");
 
  form = this.fb.nonNullable.group({
    nombre : ['',Validators.required],
    apellido : ['', Validators.required],
    dni: [0, [
      Validators.required,
      Validators.pattern(/^\d{7,8}$/)
    ]],
    email : ['', Validators.required, Validators.email],
    telefono : [0, [Validators.required,  Validators.pattern(/^[0-9]{10}$/)]]
  })

  agregarCliente(){
    const formulario = this.form.getRawValue();
    
        const request: CrearClienteRequest = {
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

  validarEmail(event:Event){
    const value=(event.target as HTMLInputElement).value.trim().toLowerCase();

    if(!value) return;

    this.validacionesService.validarEmail(value).subscribe({
      next:(existe)=>{
          this.errorEmail.set(existe ? "El correo electronico ya esta registrado" : '')
      },
      error:()=>console.log("Error al validar el email")
    })
  }

  validarDni(event:Event){
    const value=(event.target as HTMLInputElement).value.trim();

    if(!value) return;

    this.validacionesService.validarDni(value).subscribe({
      next:(existe)=>{
          this.errorDni.set(existe ? "El DNI ya esta registrado" : '')
      },
      error:()=>console.log("Error al validar el dni")
    })
  }
}
