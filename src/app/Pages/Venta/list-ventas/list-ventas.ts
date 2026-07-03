import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../../Core/Services/VentaService/venta-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../Core/Services/AuthService/auth-service';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { VentaResponse } from '../../../Core/Models/Venta';

@Component({
  selector: 'app-list-ventas',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './list-ventas.html',
  styleUrl: './list-ventas.css',
})
export class ListVentas{
  private ventaService=inject(VentaService);
  private usuarioService=inject(UsuarioService);

  filtroEncargado=signal<string>('');

  authService=inject(AuthService);
  empleados=toSignal(this.usuarioService.getEmpleados(), {initialValue:[]});

  ventas=signal<VentaResponse[]>([]);

  cantidadVentas=computed(()=>this.ventas().length);
  totalGanancia=computed(()=>this.ventas().reduce((sum, v)=>sum + v.ganancia, 0));
  totalIngresos=computed(()=>this.ventas().reduce((sum, v)=>sum + v.precioFinalDeVenta, 0));
  promedioVenta=computed(()=>this.ventas().length ? this.totalIngresos() / this.cantidadVentas() : 0)

  constructor(){
    this.getVentas();
  }

  getVentas(){
    this.ventaService.getVentas(this.filtroEncargado()).subscribe({
      next:(v)=>this.ventas.set(v),
      error:()=>console.log("Error al cargar las ventas")
    })
  }

  onEncargadoChange(event:Event){
    const value=(event.target as HTMLSelectElement).value;
    this.filtroEncargado.set(value);
    this.getVentas();
  }
}