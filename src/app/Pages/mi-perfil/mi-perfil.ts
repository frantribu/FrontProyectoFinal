import { Component, inject } from '@angular/core';
import { AuthService } from '../../Core/Services/AuthService/auth-service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Core/Services/UsuarioService/usuario-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-mi-perfil',
    imports: [],
    templateUrl: './mi-perfil.html',
    styleUrl: './mi-perfil.css',
})
export class MiPerfil {
    authService = inject(AuthService);
    router = inject(Router);
    
    usuarioService = inject(UsuarioService);

    userData = this.authService.getUser();

    userSignal = toSignal(this.usuarioService.getUserById(this.userData!.id));


    getIniciales(): string {
        return this.userSignal() ? `${this.userSignal()?.nombre.charAt(0)}${this.userSignal()?.apellido.charAt(0)} ` : ''
    }

    modificarPerfil() {
        this.router.navigate([`/mi-perfil/editar/${this.userSignal()?.id}`])
    }

}