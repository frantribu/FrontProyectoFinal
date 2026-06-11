import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { required } from '@angular/forms/signals';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';

@Component({
  selector: 'app-taller-form',
  imports: [ReactiveFormsModule],
  templateUrl: './taller-form.html',
  styleUrl: './taller-form.css',
})
export class TallerForm {
  private fb=inject(FormBuilder);
  private tallerService=inject(TallerService);

  especialidades=toSignal(this.tallerService.obtenerEspecialidades(), {initialValue:[]});

  form=this.fb.nonNullable.group({
    especialidad:['', Validators.required],
    nombre:['', Validators.required],
    idEncargadoTaller:[0, Validators.required],
    direccion:['', Validators.required]
  })
}
