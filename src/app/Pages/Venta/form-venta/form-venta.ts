import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-venta',
  imports: [],
  templateUrl: './form-venta.html',
  styleUrl: './form-venta.css',
})
export class FormVenta {
  private fb=inject(FormBuilder);

  form=this.fb.nonNullable.group({
    vehiculoId:[0, Validators.required],
    clienteId:[0, Validators.required],
    precioVenta:[0, Validators.required]
  })

  
}
