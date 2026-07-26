import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/Auth/auth-guard';
import { authenticatedGuard } from './Core/Guards/Authenticated/authenticated-guard';
import { adminGuard } from './Core/Guards/Admin/admin-guard';
import { empleadoGuard } from './Core/Guards/Empleado/empleado-guard';
import { vehiculoDisponibleGuard } from './Core/Guards/VehiculoDisponible/vehiculo-disponible-guard';
import { encargadoTallerGuard } from './Core/Guards/EncargadoTaller/encargado-taller-guard';
import { adminOrEmpleadoGuard } from './Core/Guards/AdminOrEmpleado/admin-or-empleado-guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    
    {path: "login", canActivate:[authenticatedGuard], loadComponent: () => import("./Pages/login/login").then(c=>c.Login)},

    {path:"home", canActivate:[authGuard], loadComponent:()=> import("./Pages/home/home").then(c=>c.Home)},

    {path:"users", canActivate:[adminGuard], loadComponent:()=> import("./Pages/users/list-users/users").then(c => c.Users)},
    {path:"users/nuevo", canActivate:[adminGuard], loadComponent:()=> import("./Pages/users/form-user/form-user").then(c => c.FormUser)},
    {path:"users/:id/editar", canActivate:[adminGuard], loadComponent:()=> import("./Pages/users/modificar-user/modificar-user").then(c => c.ModificarUser)},

    {path:"clientes", canActivate:[adminOrEmpleadoGuard],loadComponent:()=> import("./Pages/Clientes/list-clientes/list-clientes").then(c => c.ListClientes)},
    {path:"clientes/nuevo",canActivate:[adminOrEmpleadoGuard], loadComponent:()=> import("./Pages/Clientes/form-clientes/form-clientes").then(c => c.FormClientes)},
    {path:"clientes/:id/editar",canActivate:[adminOrEmpleadoGuard], loadComponent:()=> import("./Pages/Clientes/form-clientes/form-clientes").then(c => c.FormClientes)},

    {path:"vehiculos", canActivate:[adminOrEmpleadoGuard], loadComponent:()=>import("./Pages/Vehiculo/list-vehiculos/vehiculos").then(c=>c.Vehiculos)},
    {path:"vehiculos/nuevo", canActivate:[adminOrEmpleadoGuard], loadComponent:()=>import("./Pages/Vehiculo/vehiculo-selector/vehiculo-selector").then(c=>c.VehiculoSelector)},
    
    {path:"vehiculos/nuevo/auto", canActivate:[adminOrEmpleadoGuard], loadComponent:()=>import("./Pages/Vehiculo/form-vehiculo/auto-form/auto-form").then(c=>c.AutoForm)},
    {path:"vehiculos/auto/:id", canActivate:[adminOrEmpleadoGuard], loadComponent:()=>import("./Pages/Vehiculo/detalle-vehiculo/detalle-auto/detalle-auto").then(c=>c.DetalleAuto)},
    {path:"vehiculos/auto/:id/editar", canActivate:[adminOrEmpleadoGuard, vehiculoDisponibleGuard], loadComponent:()=>import("./Pages/Vehiculo/form-vehiculo/auto-form/auto-form").then(c=>c.AutoForm)},

    {path:"vehiculos/nuevo/moto", canActivate:[adminOrEmpleadoGuard], loadComponent:()=>import("./Pages/Vehiculo/form-vehiculo/moto-form/moto-form").then(c=>c.MotoFormComponent)},
    {path:"vehiculos/moto/:id", canActivate:[adminOrEmpleadoGuard], loadComponent:()=>import("./Pages/Vehiculo/detalle-vehiculo/detalle-moto/detalle-moto").then(c=>c.DetalleMoto)},
    {path:"vehiculos/moto/:id/editar", canActivate:[adminOrEmpleadoGuard, vehiculoDisponibleGuard], loadComponent:()=>import("./Pages/Vehiculo/form-vehiculo/moto-form/moto-form").then(c=>c.MotoFormComponent)},

    {path:"talleres", canActivate:[adminGuard],loadComponent:()=>import("./Pages/Taller/list-talleres/list-talleres").then(c=>c.ListTalleres)},
    {path:"talleres/nuevo", canActivate:[adminGuard], loadComponent:()=>import("./Pages/Taller/taller-form/taller-form").then(c=>c.TallerForm)},
    {path:"talleres/:id", canActivate:[adminGuard],loadComponent:()=>import("./Pages/Taller/detalle-taller/detalle-taller").then(c=>c.DetalleTaller)},
    
    {path:"ventas", canActivate:[adminGuard], loadComponent:()=>import("./Pages/Venta/list-ventas/list-ventas").then(c=>c.ListVentas)},
    {path:"ventas/nuevo/:id", canActivate:[vehiculoDisponibleGuard, adminGuard],loadComponent:()=>import("./Pages/Venta/form-venta/form-venta").then(c=>c.FormVenta)},  

    {path:"reparaciones", canActivate:[adminGuard], loadComponent:()=>import("./Pages/Reparaciones/list-reparaciones/list-reparaciones").then(c=>c.ListReparaciones)},  

    //PARA EL ENCARGADO DEL TALLER
    {path:"mis-talleres", canActivate:[encargadoTallerGuard], loadComponent:()=>import("./Pages/Taller/list-talleres/list-talleres").then(c=>c.ListTalleres)},
    {path:"mis-talleres/:id", canActivate:[encargadoTallerGuard], loadComponent:()=>import("./Pages/Taller/detalle-taller/detalle-taller").then(c=>c.DetalleTaller)},

    //PARA EL EMPLEADO
    {path:"mis-ventas", canActivate:[empleadoGuard], loadComponent:()=>import("./Pages/Venta/list-ventas/list-ventas").then(c=>c.ListVentas)},
    {path:"mis-ventas/nuevo/:id", canActivate:[vehiculoDisponibleGuard, empleadoGuard], loadComponent:()=>import("./Pages/Venta/form-venta/form-venta").then(c=>c.FormVenta)},  
];
