import { Component, input, OnDestroy, output, signal } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload implements OnDestroy{
  urlBase = 'http://localhost:8080/ImagenesVehiculo/';
  imagenes = signal<File[]>([]);
  imagenesExistentes = input<string[]>([]);
  eliminarImagenExistente=output<string>();

  private previewUrls = new Map<File, string>();

  onFotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) return;

    this.imagenes.update(actual => [...actual, ...Array.from(files)]);
    input.value = '';
  }

  getPreviewUrl(file: File): string {
    let url = this.previewUrls.get(file);
    if (!url) {
      url = URL.createObjectURL(file);
      this.previewUrls.set(file, url);
    }
    return url;
  }

  quitarImagen(index: number) {
    const file = this.imagenes()[index];
    const url = this.previewUrls.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      this.previewUrls.delete(file);
    }
    this.imagenes.update(imgs => imgs.filter((_, i) => i !== index));
  }

  ngOnDestroy() {
    this.previewUrls.forEach(url => URL.revokeObjectURL(url));
  }

  eliminarImagenExis(nombre:string){
    this.eliminarImagenExistente.emit(nombre);
  }
}
