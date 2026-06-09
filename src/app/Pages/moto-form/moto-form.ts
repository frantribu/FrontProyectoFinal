import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearMotoRequest } from '../../Core/Models/Moto';


@Component({
  selector: 'app-moto-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './moto-form.html',
  styleUrls: ['./moto-form.css']
})
export class MotoFormComponent {
  private fb = inject(FormBuilder);

  form: FormGroup;
  imagenes = signal<File[]>([]); 

  constructor() {
    this.form = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [null, [Validators.required, Validators.min(1900)]],
      version: ['', Validators.required], // <- Ahora es un campo de texto ("version") en vez de un ID numérico
      TipoDeMoto: ['', Validators.required],
      Cilindrada: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      kilometraje: [null, [Validators.required, Validators.min(0)]],
      patente: ['', [Validators.required, Validators.maxLength(10)]],
      color: ['', Validators.required]
    });
  }

  // ================= GESTIÓN DE IMÁGENES =================

  onFotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivosNuevos = Array.from(input.files);
      this.imagenes.update(imagenesActuales => [...imagenesActuales, ...archivosNuevos]);
    }
  }

  getPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  quitarImagen(index: number) {
    this.imagenes.update(imagenesActuales => 
      imagenesActuales.filter((_, i) => i !== index)
    );
  }

  // ================= ENVÍO DEL FORMULARIO =================

  agregarMoto() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    
    // Armamos el objeto para la API respetando la firma de CrearMotoRequest
    const nuevaMoto: CrearMotoRequest = {
      // Como idTrim sigue siendo obligatorio y numérico en tu interfaz, le inyectamos 
      // un valor por defecto (como 0 o 1) para que no tire error de tipado en TypeScript.
      idTrim: 1, 
      precio: Number(formValue.precio),
      kilometraje: Number(formValue.kilometraje),
      patente: formValue.patente,
      color: formValue.color,
      TipoDeMoto: formValue.TipoDeMoto,
      Cilindrada: Number(formValue.Cilindrada)
    };

    /* 💡 NOTA IMPORTANTE:
      Si el backend necesita procesar el texto de la "version" que el usuario escribió a mano, 
      vas a tener que sumarlo aquí abajo. Si tu interfaz no acepta "version", vas a tener que hablar 
      con el encargado del Backend para ver si le pueden agregar `version?: string` a la petición, 
      o si ellos pueden interceptar el texto para asignarle el ID correspondiente del lado del servidor.
    */
    
    // Ejemplo de cómo quedaría si pudieras enviarle también la string "version":
    // const payload extendido = { ...nuevaMoto, version: formValue.version };

    console.log('Objeto formateado para la API:', nuevaMoto);
    console.log('Texto escrito en Versión:', formValue.version);
    console.log('Fotos listas:', this.imagenes());
  }
}