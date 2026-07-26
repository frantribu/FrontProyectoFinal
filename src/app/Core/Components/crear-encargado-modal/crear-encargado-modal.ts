import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioRequest } from '../../Models/Usuario';
import { UsuarioService } from '../../Services/UsuarioService/usuario-service';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidacionService } from '../../Services/ValidacionService/validacionService';

@Component({
  selector: 'app-crear-encargado-modal',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './crear-encargado-modal.html',
  styleUrl: './crear-encargado-modal.css',
})
export class CrearEncargadoModal {
  private fb=inject(FormBuilder);
  private usuarioService=inject(UsuarioService);
  private dialogRef=inject(MatDialogRef<CrearEncargadoModal>);
  private validacionService=inject(ValidacionService);

  errorEmail=signal<string>("");
  errorDni=signal<string>("");

  form=this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: [0, [
      Validators.required,
      Validators.pattern(/^\d{7,8}$/)
    ]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })

  agregarEncargado(){
    const formulario=this.form.getRawValue();

    const request:UsuarioRequest={
      nombre:formulario.nombre,
      apellido:formulario.apellido,
      dni:formulario.dni,
      rol:"ENCARGADOTALLER",
      email:formulario.email,
      password:formulario.password
    }

    this.usuarioService.postUser(request).subscribe({
      next:(encargado)=>this.dialogRef.close(encargado),
      error:()=>console.log("Error al agregar el encargado")
    })
  }

  validarEmail(event:Event){
    const value=(event.target as HTMLInputElement).value.trim().toLowerCase();

    if(!value)return;

    this.validacionService.validarEmail(value).subscribe({
      next:(existe)=>{
          this.errorEmail.set(existe ? "El correo electronico ya esta registrado" : "");
      },
      error:()=>console.log("Error al validar el email")
    })
  }

  validarDni(event:Event){
    const value=Number((event.target as HTMLInputElement).value.trim());

    if(!value)return;

    this.validacionService.validarDni(value).subscribe({
      next:(existe)=>{
        this.errorDni.set(existe ? "El DNI ya esta registrado" : "");
      },
      error:()=>console.log("Error al validar el dni")
    })
  }
}
