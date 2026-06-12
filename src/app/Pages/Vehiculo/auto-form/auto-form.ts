<<<<<<< HEAD:src/app/Pages/auto-form/auto-form.ts
import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../Core/Services/VehiculoService/vehiculo-service';
=======
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { VehiculoService } from '../../../Core/Services/VehiculoService/vehiculo-service';
>>>>>>> 060ac8b78bf3a8242afd607fa50179e8aecb6606:src/app/Pages/Vehiculo/auto-form/auto-form.ts
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Submodelo } from '../../../Core/Models/Vehiculo';
import { CrearAutoRequest } from '../../../Core/Models/Auto';
import { ImageUpload } from '../../../Shared/image-upload/image-upload';

@Component({
  selector: 'app-auto-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, ImageUpload],
  templateUrl: './auto-form.html',
  styleUrl: './auto-form.css',
})
export class AutoForm extends ImageUpload {
  private vehiculoService = inject(VehiculoService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = Number(this.route.snapshot.paramMap.get("id"));
  isEditMode=!!this.id;

  form = this.fb.nonNullable.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    anio: [0, [Validators.required, Validators.min(1900)]],
    idTrim: [0, Validators.required],
    precio: [0, Validators.required],
    kilometraje: [0, Validators.required],
    patente: ['', Validators.required],
    color: ['', Validators.required],
  })

  marcas = toSignal(this.vehiculoService.getMarcas("AUTO"), { initialValue: [] });

  modelos = signal<String[]>([]);
  anios = signal<number[]>([]);
  submodelos = signal<Submodelo[]>([]);

  onMarcaChange() {
    this.form.get("modelo")?.reset();
    this.form.get("anio")?.reset();
    this.form.get("idTrim")?.reset();

    const marca = this.form.get("marca")?.value;

    this.modelos.set([]);
    this.anios.set([]);
    this.submodelos.set([]);

    if (!marca) {
      return;
    }

    this.vehiculoService.getModelos("AUTO", marca).subscribe({
      next: (mod) => this.modelos.set(mod),
      error: () => console.log("Error al mostrar los modelos")
    })
  }

  onModeloChange() {
    this.form.get("anio")?.reset();
    this.form.get("idTrim")?.reset();
    const modelo = this.form.get("modelo")?.value;

    this.anios.set([]);
    this.submodelos.set([]);

    if (!modelo) {
      return;
    }

    this.vehiculoService.getAnios("AUTO", modelo).subscribe({
      next: (an) => this.anios.set(an),
      error: () => console.log("Error al cargar los anios")
    });
  }

  onAnioChange() {
    this.form.get("idTrim")?.reset();
    const modelo = this.form.get("modelo")?.value;
    const anio = Number(this.form.get("anio")?.value);

    this.submodelos.set([]);

    if (!anio || !modelo) {
      return;
    }

    this.vehiculoService.getSubmodelos(modelo, anio).subscribe({
      next: (sub) => this.submodelos.set(sub),
      error: () => console.log("Error al cargar los anios")
    });
  }

  agregarAuto() {
    const formulario = this.form.getRawValue();

    const request: CrearAutoRequest = {
      idTrim: formulario.idTrim,
      precio: formulario.precio,
      color: formulario.color,
      kilometraje: formulario.kilometraje,
      patente: formulario.patente,
    }

    this.vehiculoService.agregarAuto(request, this.imagenes()).subscribe({
      next: () => this.router.navigate(['/vehiculos']),
      error: (e) => console.log("No se puedo crear el auto", e)
    })
  }

  cargarAuto(){
    this.vehiculoService.getDetalleVehiculo(this.id!)
  }

}
