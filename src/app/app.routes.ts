import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/Auth/auth-guard';
import { authenticatedGuard } from './Core/Guards/Authenticated/authenticated-guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", canActivate:[authenticatedGuard], loadComponent: () => import("./Pages/login/login").then(c=>c.Login)},

    {path:"home", canActivate:[authGuard], loadComponent:()=> import("./Pages/home/home").then(c=>c.Home)},

    {path:"vehiculos", loadComponent:()=>import("./Pages/vehiculos/list-vehiculos/vehiculos").then(c=>c.Vehiculos)},
    {path:"vehiculos/nuevo", loadComponent:()=>import("./Pages/vehiculo-selector/vehiculo-selector").then(c=>c.VehiculoSelector)},
    {path:"vehiculos/nuevo/auto", loadComponent:()=>import("./Pages/auto-form/auto-form").then(c=>c.AutoForm)},
    {path:"vehiculos/nuevo/moto", loadComponent:()=>import("./Pages/moto-form/moto-form").then(c=>c.MotoFormComponent)},
    {path:"vehiculos/:id", loadComponent:()=>import("./Pages/detalle-vehiculo/detalle-vehiculo").then(c=>c.DetalleVehiculo)}
];
