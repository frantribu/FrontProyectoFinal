import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-acceso-rapido',
  imports: [],
  templateUrl: './card-acceso-rapido.html',
  styleUrl: './card-acceso-rapido.css',
})
export class CardAccesoRapido {
  titulo=input.required<string>();
  descripcion=input.required<string>();
  logo=input.required<string>();
  iconColor=input.required<string>();
  backgroundIcon=input.required<string>();
}
