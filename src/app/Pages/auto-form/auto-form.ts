import { Component, inject, signal } from '@angular/core';
import { VehiculoService } from '../../Core/Services/VehiculoService/vehiculo-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { CrearVehiculoRequest, Submodelo } from '../../Core/Models/Vehiculo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auto-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './auto-form.html',
  styleUrl: './auto-form.css',
})
export class AutoForm {
  private vehiculoService = inject(VehiculoService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    anio: [0, Validators.required],
    idTrim: [0, Validators.required],
    precio: [0, Validators.required],
    kilometraje: [0, Validators.required],
    patente: ['', Validators.required],
    color: ['', Validators.required]
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

    if (!marca) {
      this.modelos.set([])
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

    if (!modelo) {
      this.anios.set([]);
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

    if (!anio || !modelo) {
      this.submodelos.set([]);
      return;
    }

    this.vehiculoService.getSubmodelos(modelo, anio).subscribe({
      next: (sub) => this.submodelos.set(sub),
      error: () => console.log("Error al cargar los anios")
    });
  }

  agregarAuto() {
    const formulario = this.form.getRawValue();

    const request: CrearVehiculoRequest = {
      idTrim: formulario.idTrim,
      precio: formulario.precio,
      color: formulario.color,
      kilometraje: formulario.kilometraje,
      patente: formulario.patente
    }

    this.vehiculoService.agregarAuto(request).subscribe({
      next: () => this.router.navigate(['/vehiculos']),
      error: (e) => console.log("No se puedo crear el auto", e)
    })
  }

}
