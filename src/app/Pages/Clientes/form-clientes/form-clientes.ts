import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../Core/Services/ClienteService/cliente-service';

@Component({
  selector: 'app-form-clientes',
  imports: [ReactiveFormsModule],
  templateUrl: './form-clientes.html',
  styleUrl: './form-clientes.css',
})
export class FormClientes {

  private fb = inject(FormBuilder)
  private clienteService = inject(ClienteService)
 
  form = this.fb.nonNullable.group({
    nombre : ['',Validators.required],
    apellido : ['', Validators.required],
    email : ['', Validators.required, Validators.email],
    telefono : ['', Validators.required]
  })
}
