import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearClienteRequest } from '../../Models/Cliente';
import { ClienteService } from '../../Services/ClienteService/cliente-service';
import { ValidacionService } from '../../Services/ValidacionService/validacionService';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cliente-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-cliente-modal.html',
  styleUrl: './crear-cliente-modal.css',
})
export class CrearClienteModal {
  private fb = inject(FormBuilder);
  private clienteService=inject(ClienteService);
  private validacionService=inject(ValidacionService);
  private dialogRef=inject(MatDialogRef<CrearClienteModal>)

  errorEmail=signal<string>("");
  errorDni=signal<string>("");

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: [0, [
      Validators.required,
      Validators.pattern(/^\d{7,8}$/)
    ]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+]?[0-9\s\-]{8,15}$/)]]
  });

  agregarCliente(){
    const formulario=this.form.value;

    const request:CrearClienteRequest={
      nombre:formulario.nombre!,
      apellido:formulario.apellido!,
      dni:formulario.dni!,
      email:formulario.email!,
      telefono:formulario.telefono!
    }

    this.clienteService.crearCliente(request).subscribe({
      next:(cli)=>this.dialogRef.close(cli),
      error:(e)=>console.log("Error al crear el cliente: ", e)
    })
  }

  validarEmail(event:Event){
    const value=(event.target as HTMLInputElement).value.trim().toLowerCase();

    if(!value) return;

    this.validacionService.validarEmail(value).subscribe({
      next:(existe)=>{
        this.errorEmail.set(existe ? 'El correo ya esta registrado' : '')
      },
      error:()=>console.log("Error al validar el email")
    })
  }

    validarDni(event:Event){
    const value=(event.target as HTMLInputElement).value.trim();

    if(!value) return;

    this.validacionService.validarDni(value).subscribe({
      next:(existe)=>{
        this.errorDni.set(existe ? 'El DNI ya esta registrado' : '')
      },
      error:()=>console.log("Error al validar el DNI")
    })
  }
}
