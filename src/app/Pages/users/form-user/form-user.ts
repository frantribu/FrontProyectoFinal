import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form-user',
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.html',
  styleUrl: './form-user.css',
})
export class FormUser {
  private fb = inject(FormBuilder)
  private userService = inject(UsuarioService)
 
  roles = toSignal(this.userService.getRoles(), {initialValue:[]})

  form = this.fb.nonNullable.group({
    nombre : ['',Validators.required],
    apellido : ['', Validators.required],
    rol : ['', Validators.required],
    email : ['', Validators.required, Validators.email],
    password : ['', Validators.required]
  })
}
