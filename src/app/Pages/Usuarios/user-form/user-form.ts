import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../Core/Services/UsuarioService/usuario-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
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
