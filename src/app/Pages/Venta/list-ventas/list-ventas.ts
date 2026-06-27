import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Para pipes como currency y date

interface VentaResponse {
  vehiculoId: number;
  clienteId: number;
  vendedorId: number;
  precioVenta: number;
  fechaVenta: string;
}

@Component({
  selector: 'app-list-ventas',
  standalone: true,
  imports: [HttpClientModule, CommonModule], 
  templateUrl: './list-ventas.html',
  styleUrl: './list-ventas.css',
})
export class ListVentas implements OnInit {
  
  ventas: VentaResponse[] = [];
  isLoading: boolean = true;
  errorMensaje: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarHistorialVentas();
  }

  cargarHistorialVentas(): void {
    this.http.get<VentaResponse[]>('http://localhost:8080/historial/ventas')
      .subscribe({
        next: (data) => {
          this.ventas = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMensaje = 'No se pudo acceder al historial de ventas. Comprobá tu sesión.';
          this.isLoading = false;
        }
      });
  }
}