import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReparacionService } from '../../../Core/Services/ReparacionService/reparacion-service';
import { TallerService } from '../../../Core/Services/TallerService/taller-service';
import { VehiculoService } from '../../../Core/Services/VehiculoService/vehiculo-service';

const hoy = new Date().toISOString().split('T')[0];

@Component({
  selector: 'app-reparacion-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-reparacion.html',
  styleUrls: ['./form-reparacion.css']
})
export class ReparacionFormComponent {
  private fb = inject(FormBuilder);
  private reparacionService = inject(ReparacionService);
  private tallerService = inject(TallerService);
  private vehiculoService = inject(VehiculoService);
  private router = inject(Router);

  talleres = toSignal(this.tallerService.getTalleres("true"), { initialValue: [] });
  vehiculos = toSignal(this.vehiculoService.getVehiculos("DISPONIBLE"), { initialValue: [] }); // O el método que uses para listar vehículos

  form = this.fb.nonNullable.group({
    idTaller: ['', Validators.required],
    idVehiculo: ['', Validators.required],
    fechaDeEntrada: [hoy, Validators.required],
    fechaDeSalida: [''], 
    descripcion: ['', [Validators.required, Validators.maxLength(500)]]
  });


  agregarReparacion() {
    if (this.form.invalid) return;

    const formulario = this.form.getRawValue();

    const request = {
      idTaller: Number(formulario.idTaller),
      idVehiculo: Number(formulario.idVehiculo),
      fechaDeEntrada: formulario.fechaDeEntrada,
      fechaDeSalida: formulario.fechaDeSalida ? formulario.fechaDeSalida : null,
      descripcion: formulario.descripcion
    };

    this.reparacionService.agregarReparacion(request).subscribe({
      next: () => {
        this.router.navigate(['/reparaciones']); // Redirección al listado
        console.log('Reparación registrada con éxito:', request);
      },
      error: (e) => console.error("No se pudo registrar la reparación", e)
    });
  }
}