import { Component, inject } from '@angular/core';
import { AuthService } from '../../Core/Services/AuthService/auth-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mi-perfil',
    imports: [],
    templateUrl: './mi-perfil.html',
    styleUrl: './mi-perfil.css',
})
export class MiPerfil {
    authService = inject(AuthService);
    router = inject(Router)
    user = this.authService.getUser()

    getIniciales(): string {
        return this.user ? `${this.user?.nombre.charAt(0)}${this.user.apellido.charAt(0)} ` : ''
    }

    modificarPerfil() {
        this.router.navigate([`/mi-perfil/editar/${this.user?.id}`])
    }

}