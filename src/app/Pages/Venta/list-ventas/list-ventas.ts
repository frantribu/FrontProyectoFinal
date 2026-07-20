import { Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../../Core/Services/VentaService/venta-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../Core/Services/AuthService/auth-service';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { VentaResponse } from '../../../Core/Models/Venta';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatPaginatorModule, MatTableModule],
  templateUrl: './list-ventas.html',
  styleUrl: './list-ventas.css',
})
export class ListVentas {
  private ventaService = inject(VentaService);
  private usuarioService = inject(UsuarioService);

  filtroEncargado = signal<string>('');

  fb = inject(FormBuilder)

  authService = inject(AuthService);
  empleados = toSignal(this.usuarioService.getEmpleados(), { initialValue: [] });

  ventas = signal<VentaResponse[]>([]);

  cantidadVentas = computed(() => this.ventas().length);
  totalGanancia = computed(() => this.ventas().reduce((sum, v) => sum + v.ganancia, 0));
  totalIngresos = computed(() => this.ventas().reduce((sum, v) => sum + v.precioFinalDeVenta, 0));
  promedioVenta = computed(() => this.ventas().length ? this.totalIngresos() / this.cantidadVentas() : 0)

  displayedColumns: string[] = ["vehiculo", "cliente", "vendedor", "precioCompra", "precioVenta", "ganancia", "fechaVenta"];
  dataSource = new MatTableDataSource<VentaResponse>([]);
  paginator = viewChild<MatPaginator>("paginator");

  errorFechas = signal<string>('');

  filtroFechas = this.fb.nonNullable.group({
    fechaDesde: ["", Validators.required],
    fechaHasta: ["", Validators.required]
  })

  constructor() {
    this.getVentas();

    effect(() => {
      this.dataSource.data = this.ventas();
    })

    effect(() => {
      const matPaginator = this.paginator();

      if (matPaginator) {
        this.dataSource.paginator = matPaginator;
      }
    })
  }

  getVentas() {
    const { fechaDesde, fechaHasta } = this.filtroFechas.getRawValue();
    if (!fechaDesde || !fechaHasta) {
      this.ventaService.getVentas(this.filtroEncargado()).subscribe({
        next: (v) => this.ventas.set(v),
        error: () => console.log("Error al cargar las ventas")
      })
    }else{
      this.ventaService.getVentas(this.filtroEncargado(), fechaDesde, fechaHasta).subscribe({
        next: (v) => this.ventas.set(v),
        error: () => console.log("Error al cargar las ventas filtradas")
      });
    }

  }

  onEncargadoChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filtroEncargado.set(value);
    this.getVentas();
  }

  buscarVentas() {
    this.errorFechas.set('')

    if (this.filtroFechas.invalid) return;

    const fechaDesde = this.filtroFechas.value.fechaDesde;

    const fechaHasta = this.filtroFechas.value.fechaHasta;

    if (!fechaDesde || !fechaHasta) return;

    if (this.filtroFechas.value.fechaDesde && this.filtroFechas.value.fechaHasta && new Date(this.filtroFechas.value.fechaDesde) > new Date(this.filtroFechas.value.fechaHasta)) {
      this.errorFechas.set('La fecha de inicio no puede ser mayor a la fecha final.');
      return;
    }

    this.ventaService.getVentas(this.filtroEncargado(), fechaDesde, fechaHasta).subscribe({
      next: (data => {
        this.ventas.set(data)
      }),
      error: err => console.log(err)
    })


  }
}