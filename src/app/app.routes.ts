import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/Auth/auth-guard';
import { authenticatedGuard } from './Core/Guards/Authenticated/authenticated-guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    
    {path: "login", canActivate:[authenticatedGuard], loadComponent: () => import("./Pages/login/login").then(c=>c.Login)},

    {path:"home", canActivate:[authGuard], loadComponent:()=> import("./Pages/home/home").then(c=>c.Home)},

    {path:"users", loadComponent:()=> import("./Pages/users/users").then(c => c.Users)}

];
