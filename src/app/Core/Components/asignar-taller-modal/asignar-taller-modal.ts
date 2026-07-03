import { Component, inject} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TallerService } from '../../Services/TallerService/taller-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsignarTallerRequest } from '../../Models/Taller';

@Component({
  selector: 'app-asignar-taller-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './asignar-taller-modal.html',
  styleUrl: './asignar-taller-modal.css',
})
export class AsignarTallerModal {
  private fb = inject(FormBuilder);
  private tallerService = inject(TallerService);
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AsignarTallerModal>);

  talleres = toSignal(this.tallerService.getTalleres("true"), { initialValue: [] });

  form = this.fb.nonNullable.group({
    tallerId: [0, Validators.required],
    motivo: ['', Validators.required]
  })

  asignarTaller() {
    if(this.form.invalid)return;
    
    const formulario = this.form.getRawValue()

    const request: AsignarTallerRequest = {
      idVehiculo: this.data.vehiculoId,
      idTaller:formulario.tallerId,
      motivo:formulario.motivo
    }

    this.tallerService.asignarVehiculo(request).subscribe({
      next:()=>this.dialogRef.close(true),
      error:(e)=>console.log("Error al asignar el vehiculo al taller: ", e)
    })
  }

}
