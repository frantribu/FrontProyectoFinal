import { Component, inject } from '@angular/core';
import { AuthService } from '../../Core/Services/AuthService/auth-service';
import { RouterLink } from "@angular/router";
import { CardResumen } from "../../Shared/card-resumen/card-resumen";
import { CardAccesoRapido } from "../../Shared/card-acceso-rapido/card-acceso-rapido";
import { VentaService } from '../../Core/Services/VentaService/venta-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardResumen, CardAccesoRapido],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private ventaService=inject(VentaService);

  totalDeVentas=toSignal(this.ventaService.ventasTotales(), {initialValue:0});
}
