import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../Core/Services/AuthService/auth-service';
import { RouterLink } from "@angular/router";
import { CardResumen } from "../../Shared/card-resumen/card-resumen";
import { CardAccesoRapido } from "../../Shared/card-acceso-rapido/card-acceso-rapido";
import { VentaService } from '../../Core/Services/VentaService/venta-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReparacionService } from '../../Core/Services/ReparacionService/reparacion-service';
import { ClienteService } from '../../Core/Services/ClienteService/cliente-service';
import { VehiculoService } from '../../Core/Services/VehiculoService/vehiculo-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, CardResumen, CardAccesoRapido, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private ventaService = inject(VentaService);
  private reparacionService = inject(ReparacionService);
  private clienteService = inject(ClienteService);
  private vehiculoService = inject(VehiculoService);

  authService = inject(AuthService);

  fechaActual = new Date();

  //KPIs admin
  facturacionDelMes = toSignal(this.ventaService.getFacturacionDelMes(), { initialValue: 0 });
  ventasDelMes = toSignal(this.ventaService.getVentasDelMes(), { initialValue: 0 });
  reparacionesActivas = toSignal(this.reparacionService.getReparacionesActivas(), { initialValue: 0 });
  clientesTotales = toSignal(this.clienteService.contarClientes(), { initialValue: 0 });

  //KPIs empleado
  facturacionDelMesPorEmpleado = toSignal(this.ventaService.getFacturacionDelMesEmpleado(), { initialValue: 0 });
  ventasDelMesPorEmpleado = toSignal(this.ventaService.getVentasDelMesEmpleado(), { initialValue: 0 });
  vehiculosDisponibles = toSignal(this.vehiculoService.countVehiculosDisponibles(), { initialValue: 0 });

  //Ultimas tres ventas del empleado
  ultimasTresVentas=toSignal(this.ventaService.getUltimasTresVentasEmpleado(), {initialValue:[]})
}
