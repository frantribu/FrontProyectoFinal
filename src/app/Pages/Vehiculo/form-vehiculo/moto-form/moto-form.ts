import { Component, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculoService } from '../../../../Core/Services/VehiculoService/vehiculo-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CrearMotoRequest } from '../../../../Core/Models/Moto';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUpload } from '../../../../Shared/image-upload/image-upload';
import { ValidatorsPersonalizados } from '../../../../Shared/Validators/ValidatorsPersonalizados';


@Component({
  selector: 'app-moto-form',
  standalone: true,
  imports: [ReactiveFormsModule, ImageUpload],
  templateUrl: './moto-form.html',
  styleUrls: ['./moto-form.css']
})
export class MotoFormComponent {
  private fb = inject(FormBuilder);
  private vehiculoService = inject(VehiculoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private imagenUpload = viewChild.required(ImageUpload);

  id = Number(this.route.snapshot.paramMap.get("id"));
  isEditable = this.id !== null && this.id !== 0

  mensajeError = signal<string>('');
  patenteOriginal = ""

  marcas = toSignal(this.vehiculoService.getMarcas("moto"), { initialValue: [] });
  modelos = signal<String[]>([]);
  tiposMoto = toSignal(this.vehiculoService.obtenerTiposMoto(), { initialValue: [] })

  form = this.fb.nonNullable.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    anio: [0, [Validators.required, Validators.min(1900)]],
    version: ['', Validators.required],
    tipoMoto: ['', Validators.required],
    motor: ['', Validators.required],
    combustion: ['', Validators.required],
    cilindrada: [0, [Validators.required, Validators.min(1)]],
    precioCompra: [0, [Validators.required, Validators.min(1)]],
    precioVenta: [0, [Validators.required, Validators.min(1)]],
    kilometraje: [0, [Validators.required, Validators.min(0)]],
    patente: ['', [Validators.required, Validators.pattern(/^\s*([a-zA-Z]{3}\s*\d{3}|[a-zA-Z]\s*\d{3}\s*[a-zA-Z]{3})\s*$/)]],
    color: ['', Validators.required],
    descripcion: ['']
  }, {
    validators: [ValidatorsPersonalizados.validarPrecioDeCompraVenta]
  });

  constructor() {
    if (this.isEditable) {
      this.cargarMotoParaEditar();
    }
  }

  onMarcaChange() {
    this.form.get("modelo")?.reset();
    const marca = this.form.get("marca")?.value;

    if (!marca) {
      this.modelos.set([]);
      return;
    }

    this.vehiculoService.getModelos("MOTO", marca).subscribe({
      next: (m) => this.modelos.set(m),
      error: () => console.log("Error al mostrar los modelos")
    })
  }

  // ================= ENVIO DEL FORMULARIO =================

  agregarMoto() {
    if (this.form.invalid) return;

    const formulario = this.form.getRawValue();

    const request: CrearMotoRequest = {
      marca: formulario.marca,
      modelo: formulario.modelo,
      version: formulario.version,
      anio: formulario.anio,
      motor: formulario.motor,
      combustion: formulario.combustion,
      descripcion: formulario.descripcion,
      cilindrada: formulario.cilindrada,
      tipoMoto: formulario.tipoMoto,
      precioCompra: formulario.precioCompra,
      precioVenta: formulario.precioVenta,
      kilometraje: formulario.kilometraje,
      patente: formulario.patente,
      color: formulario.color
    }

    this.vehiculoService.agregarMoto(request, this.imagenUpload().imagenes()).subscribe({
      next: () => {
        this.router.navigate(['/vehiculos'])
      },
      error: (e) => console.log("No se pudo crear la moto ", e)
    })
  }

  cargarMotoParaEditar() {
    this.vehiculoService.getDetalleMoto(this.id).subscribe({
      next: (moto) => {
        this.vehiculoService.getModelos("MOTO", moto.marca).subscribe(
          mod => this.modelos.set(mod)
        );

        this.patenteOriginal = moto.patente;
        console.log(moto);

        this.form.patchValue({
          marca: moto.marca,
          modelo: moto.modelo,
          version: moto.version,
          anio: moto.anio,
          motor: moto.motor,
          combustion: moto.combustion,
          descripcion: moto.descripcion,
          cilindrada: moto.cilindrada,
          tipoMoto: moto.tipoMoto.name,
          precioCompra: moto.precioCompra,
          precioVenta: moto.precioVenta,
          kilometraje: moto.kilometraje,
          patente: moto.patente,
          color: moto.color
        })
      },
      error: (e) => {
        if (e.status === 404) {
          this.router.navigate(['/vehiculos'])
        } else {
          console.log("Error al cargar la moto");
        }
      }
    })
  }

  editarMoto() {
    if (this.form.invalid) return;

    const formulario = this.form.getRawValue();

    const request: CrearMotoRequest = {
      marca: formulario.marca,
      modelo: formulario.modelo,
      version: formulario.version,
      anio: formulario.anio,
      motor: formulario.motor,
      combustion: formulario.combustion,
      descripcion: formulario.descripcion,
      cilindrada: formulario.cilindrada,
      tipoMoto: formulario.tipoMoto,
      precioCompra: formulario.precioCompra,
      precioVenta: formulario.precioVenta,
      kilometraje: formulario.kilometraje,
      patente: formulario.patente,
      color: formulario.color
    };

    this.vehiculoService.modificarMoto(this.id, request).subscribe({
      next: () => this.router.navigate(['/vehiculos']),
      error: (e) => console.log("Error al modificar la moto: ", e)
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditable) {
      this.editarMoto()
    } else {
      this.agregarMoto()
    }
  }

  validarPatente(event: Event) {
    if (this.form.invalid) return;

    const value = (event.target as HTMLInputElement).value.replaceAll(/\s/g, "");

    if (this.isEditable && value === this.patenteOriginal) {
      this.mensajeError.set("");
      return;
    }

    this.vehiculoService.validarPatente(value).subscribe({
      next: (existe) => {
        this.mensajeError.set(existe ? "La patente ya esta registrada" : "")
      },
      error: (e) => console.log("Error al validad la patente: ", e)
    })
  }
}