import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { CrearTallerRequest } from '../../../Core/Models/Taller';
import { Router } from '@angular/router';
import { UsuarioResponse } from '../../../Core/Models/Usuario';
import { ClienteResponse } from '../../../Core/Models/Cliente';
import { MatDialog } from '@angular/material/dialog';
import { CrearEncargadoModal } from '../../../Core/Components/crear-encargado-modal/crear-encargado-modal';

@Component({
  selector: 'app-taller-form',
  imports: [ReactiveFormsModule],
  templateUrl: './taller-form.html',
  styleUrl: './taller-form.css',
})
export class TallerForm {
  private fb = inject(FormBuilder);
  private tallerService = inject(TallerService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private dialog=inject(MatDialog);

  especialidades = toSignal(this.tallerService.obtenerEspecialidades(), { initialValue: [] });
  encargados = signal<UsuarioResponse[]>([]);

  mostrarLista=signal(false);
  buscador=signal<string>("");

  private timerBusqueda:any;

  constructor(){
    effect(()=>{
      const busqueda=this.buscador();

      clearTimeout(this.timerBusqueda);

      this.timerBusqueda=setTimeout(()=>{
        this.getEncargados(busqueda);
      }, 350)
    })
  }

  form = this.fb.nonNullable.group({
    especialidad: ['', Validators.required],
    nombre: ['', Validators.required],
    idEncargadoTaller: [0, [Validators.required, Validators.min(1)]],
    direccion: ['', Validators.required]
  });

  comprobarEncargado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    
    if (Number(selectElement.value) === -1) {
      this.router.navigate(['/talleres/nuevo']);
    }
  }

  crearTaller() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formulario = this.form.getRawValue();

    const request: CrearTallerRequest = {
      especialidad: formulario.especialidad,
      nombre: formulario.nombre,
      idEncargadoTaller: Number(formulario.idEncargadoTaller),
      direccion: formulario.direccion
    };

    this.tallerService.crearTaller(request).subscribe({
      next: () => this.router.navigate(['/talleres']),
      error: (e) => console.log("Error al crear el taller: ", e)
    });
  }

  getEncargados(busqueda:string){
    this.usuarioService.getEncargados(busqueda).subscribe({
      next:(e)=>this.encargados.set(e),
      error:()=>console.log("Error al obtener los encargados")
    })
  }

  buscarEncargado(event:Event){
    const value=(event.target as HTMLInputElement).value;
    this.mostrarLista.set(true);
    this.buscador.set(value);

    if(!value.trim()){
      this.mostrarLista.set(false);
      this.encargados.set([]);
      return;
    }
  }

  seleccionarEncargado(encargado:UsuarioResponse){
    this.mostrarLista.set(false);
    this.buscador.set(encargado.nombre + " " + encargado.apellido);
    this.form.patchValue({idEncargadoTaller:encargado.id});
  }

  abrirModal(){
    this.dialog.open(CrearEncargadoModal, {
      width:"400px"
    }).afterClosed().subscribe(encargado=>{
      if(encargado){
        this.seleccionarEncargado(encargado);
      }
    })
  }
}
