import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/Auth/auth-guard';
import { authenticatedGuard } from './Core/Guards/Authenticated/authenticated-guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", canActivate:[authenticatedGuard], loadComponent: () => import("./Pages/login/login").then(c=>c.Login)},

    {path:"home", canActivate:[authGuard], loadComponent:()=> import("./Pages/home/home").then(c=>c.Home)},

    {path:"vehiculos", loadComponent:()=>import("./Pages/Vehiculo/list-vehiculos/vehiculos").then(c=>c.Vehiculos)},
    {path:"vehiculos/nuevo", loadComponent:()=>import("./Pages/Vehiculo/vehiculo-selector/vehiculo-selector").then(c=>c.VehiculoSelector)},
    
    {path:"vehiculos/nuevo/auto", loadComponent:()=>import("./Pages/Vehiculo/form-vehiculo/auto-form/auto-form").then(c=>c.AutoForm)},
    {path:"vehiculos/auto/:id", loadComponent:()=>import("./Pages/Vehiculo/detalle-vehiculo/detalle-auto/detalle-auto").then(c=>c.DetalleAuto)},
    {path:"vehiculos/auto/:id/editar", loadComponent:()=>import("./Pages/Vehiculo/form-vehiculo/auto-form/auto-form").then(c=>c.AutoForm)},

    {path:"vehiculos/nuevo/moto", loadComponent:()=>import("./Pages/Vehiculo/form-vehiculo/moto-form/moto-form").then(c=>c.MotoFormComponent)},
    {path:"vehiculos/moto/:id", loadComponent:()=>import("./Pages/Vehiculo/detalle-vehiculo/detalle-moto/detalle-moto").then(c=>c.DetalleMoto)},
    {path:"vehiculos/moto/:id/editar", loadComponent:()=>import("./Pages/Vehiculo/form-vehiculo/moto-form/moto-form").then(c=>c.MotoFormComponent)},

    {path:"talleres", loadComponent:()=>import("./Pages/Taller/list-talleres/list-talleres").then(c=>c.ListTalleres)},
    {path:"talleres/nuevo", loadComponent:()=>import("./Pages/Taller/taller-form/taller-form").then(c=>c.TallerForm)}
];
