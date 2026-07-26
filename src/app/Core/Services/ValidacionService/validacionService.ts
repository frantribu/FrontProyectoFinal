import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidacionService {
  private url = "http://localhost:8080/validaciones"
  private http = inject(HttpClient);
  
  validarEmail(email: string) {
    return this.http.get<boolean>(`${this.url}/email/${email}`)
  }

  validarDni(dni: number) {
    return this.http.get<boolean>(`${this.url}/dni/${dni}`)
  }
}
