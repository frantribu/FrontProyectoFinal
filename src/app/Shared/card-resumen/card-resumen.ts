import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-resumen',
  imports: [],
  templateUrl: './card-resumen.html',
  styleUrl: './card-resumen.css',
})
export class CardResumen {
  icono=input.required<string>();
  titulo=input.required<string>();
  valor=input.required<string>();
}
