import { Component, inject } from '@angular/core';
import { AuthService } from '../../Core/Services/AuthService/auth-service';
import { RouterLink } from "@angular/router";
import { CardResumen } from "../../Shared/card-resumen/card-resumen";
import { CardAccesoRapido } from "../../Shared/card-acceso-rapido/card-acceso-rapido";

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardResumen, CardAccesoRapido],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  authService=inject(AuthService)

}
