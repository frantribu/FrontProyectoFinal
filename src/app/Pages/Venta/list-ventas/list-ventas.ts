import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para pipes como currency y date
import { VentaService } from '../../../Core/Services/VentaService/venta-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-ventas',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './list-ventas.html',
  styleUrl: './list-ventas.css',
})
export class ListVentas{
  private ventaService=inject(VentaService);
  
  ventas=toSignal(this.ventaService.getVentas(), {initialValue:[]})
}