import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { CrearTallerRequest } from '../../../Core/Models/Taller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taller-form',
  imports: [ReactiveFormsModule],
  templateUrl: './taller-form.html',
  styleUrl: './taller-form.css',
})
export class TallerForm {
  private fb=inject(FormBuilder);
  private tallerService=inject(TallerService);
  private usuarioService=inject(UsuarioService);
  private router=inject(Router);

  especialidades=toSignal(this.tallerService.obtenerEspecialidades(), {initialValue:[]});
  encargados=toSignal(this.usuarioService.getEncargados(), {initialValue:[]});

  form=this.fb.nonNullable.group({
    especialidad:['', Validators.required],
    nombre:['', Validators.required],
    idEncargadoTaller:[0, Validators.required],
    direccion:['', Validators.required]
  })

  crearTaller(){
    const formulario=this.form.getRawValue();

    const request:CrearTallerRequest={
      especialidad:formulario.especialidad,
      nombre:formulario.nombre,
      idEncargadoTaller:formulario.idEncargadoTaller,
      direccion:formulario.direccion
    };

    this.tallerService.crearTaller(request).subscribe({
      next:()=>this.router.navigate(['/talleres']),
      error:(e)=>console.log("Error al crear el taller: ", e)
    })
  }
}
