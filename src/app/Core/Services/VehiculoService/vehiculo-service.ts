import { HttpClient, } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoDetalleResponse, CrearAutoRequest, Submodelo } from '../../Models/Auto';
import { Estado, VehiculoResponse } from '../../Models/Vehiculo';
import { CrearMotoRequest, MotoDetalleResponse, TipoMoto } from '../../Models/Moto';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private url = "http://localhost:8080/vehiculos"
  private http = inject(HttpClient)
  private token = localStorage.getItem("authToken")

  /*--------------------------------------------------------VEHICULOS-----------------------------------------------------------------------------------*/

  getVehiculos(estado: string): Observable<VehiculoResponse[]> {
    return this.http.get<VehiculoResponse[]>(`${this.url}?estado=${estado}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getDetalleAuto(id: number): Observable<AutoDetalleResponse> {
    return this.http.get<AutoDetalleResponse>(this.url + `/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getDetalleMoto(id: number): Observable<MotoDetalleResponse> {
    return this.http.get<MotoDetalleResponse>(this.url + `/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getMarcas(tipo: String): Observable<String[]> {
    return this.http.get<String[]>(this.url + `/marcas?tipo=${tipo}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getModelos(tipo: String, marca: String): Observable<String[]> {
    return this.http.get<String[]>(this.url + `/modelos?tipo=${tipo}&make=${marca}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getAnios(tipo: String, modelo: String): Observable<number[]> {
    return this.http.get<number[]>(this.url + `/anios?tipo=${tipo}&model=${modelo}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getSubmodelos(modelo: String, anio: number): Observable<Submodelo[]> {
    return this.http.get<Submodelo[]>(this.url + `/submodelos?model=${modelo}&year=${anio}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.url + "/estados", {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  /*------------------------------------------AUTO----------------------------------------------------*/

  agregarAuto(auto: CrearAutoRequest, imagenes: File[]): Observable<AutoDetalleResponse> {
    const form = new FormData();
    form.append('datos', new Blob([JSON.stringify(auto)], { type: 'application/json' }));
    imagenes.forEach(img => form.append('files', img));
    return this.http.post<AutoDetalleResponse>(this.url + `/autos`, form, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  modificarAuto(id: number, auto: CrearAutoRequest): Observable<AutoDetalleResponse> {
    return this.http.put<AutoDetalleResponse>(this.url + `/modificar/${id}`, auto, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  /*------------------------------------------MOTO----------------------------------------------------*/

  agregarMoto(moto: CrearMotoRequest, imagenes: File[]): Observable<MotoDetalleResponse> {
    const form = new FormData();
    form.append('datos', new Blob([JSON.stringify(moto)], { type: 'application/json' }));
    imagenes.forEach(img => form.append('files', img));
    return this.http.post<MotoDetalleResponse>(this.url + "/motos", form, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  obtenerTiposMoto() {
    return this.http.get<TipoMoto[]>(this.url + `/tipos-moto`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  eliminarVehiculo(id: number) {
    return this.http.delete(this.url + `/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }


}
