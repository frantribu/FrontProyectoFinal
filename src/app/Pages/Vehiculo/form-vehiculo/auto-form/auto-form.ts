import { Component, inject, signal, viewChild } from '@angular/core';
import { VehiculoService } from '../../../../Core/Services/VehiculoService/vehiculo-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Submodelo } from '../../../../Core/Models/Auto';
import { CrearAutoRequest } from '../../../../Core/Models/Auto';
import { ImageUpload } from '../../../../Shared/image-upload/image-upload';

@Component({
  selector: 'app-auto-form',
  imports: [ReactiveFormsModule, ImageUpload],
  templateUrl: './auto-form.html',
  styleUrl: './auto-form.css',
})
export class AutoForm {
  private vehiculoService = inject(VehiculoService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private imageUpload = viewChild.required(ImageUpload);

  id = Number(this.route.snapshot.paramMap.get("id"));
  isEditable = this.id !=null && this.id!==0

  form = this.fb.nonNullable.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    anio: [0, [Validators.required, Validators.min(1900)]],
    idTrim: [0, Validators.required],
    precio: [0, Validators.required],
    kilometraje: [0, Validators.required],
    patente: ['', Validators.required],
    color: ['', Validators.required],
    descripcion: ['']
  })

  marcas = toSignal(this.vehiculoService.getMarcas("AUTO"), { initialValue: [] });

  modelos = signal<String[]>([]);
  anios = signal<number[]>([]);
  submodelos = signal<Submodelo[]>([]);

  constructor() {
    if (this.isEditable) {
      this.cargarAutoParaEditar();
    }
  }

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
      descripcion: formulario.descripcion
    }

    this.vehiculoService.agregarAuto(request, this.imageUpload().imagenes()).subscribe({
      next: () => this.router.navigate(['/vehiculos']),
      error: (e) => console.log("No se puedo crear el auto", e)
    })
  }

  cargarAutoParaEditar() {
    this.vehiculoService.getDetalleAuto(this.id).subscribe({
      next: (auto) => {
        this.vehiculoService.getModelos("AUTO", auto.marca).subscribe(
          mod => this.modelos.set(mod)
        );

        this.vehiculoService.getAnios("AUTO", auto.modelo).subscribe(
          anio => this.anios.set(anio)
        );

        this.vehiculoService.getSubmodelos(auto.modelo, auto.anio).subscribe(
          sub => this.submodelos.set(sub)
        );

        this.form.patchValue({
          marca: auto.marca,
          modelo: auto.modelo,
          anio: auto.anio,
          idTrim: auto.idTrim,
          precio: auto.precio,
          kilometraje: auto.kilometraje,
          patente: auto.patente,
          color: auto.color,
          descripcion: auto.descripcion
        })
      },
      error: (e) => {
        if (e.status === 403) {
          this.router.navigate(['/vehiculos'])
        } else {
          console.log("Error al cargar el auto")
        }
      }
    })
  }

  editarAuto() {
    const formulario = this.form.getRawValue();

    const request: CrearAutoRequest = {
      idTrim: formulario.idTrim,
      precio: formulario.precio,
      color: formulario.color,
      kilometraje: formulario.kilometraje,
      patente: formulario.patente,
      descripcion: formulario.descripcion
    }

    this.vehiculoService.modificarAuto(this.id, request).subscribe({
      next: () => this.router.navigate(['/vehiculos']),
      error: (e) => console.log("No se puedo modificar el auto", e)
    })
  }

  onSubmit() {
    if (this.isEditable) {
      this.editarAuto();
    } else {
      this.agregarAuto();
    }
  }
}
