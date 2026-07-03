import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Core/Services/AuthService/auth-service';
import { Nav } from "./Core/Components/nav/nav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  protected readonly title = signal('FrontProyectoFinal');

  authService=inject(AuthService)
}
