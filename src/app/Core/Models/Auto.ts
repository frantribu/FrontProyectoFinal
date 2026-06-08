import { CrearVehiculoRequest, VehiculoDetalleResponse } from "./Vehiculo";

export interface AutoDetalleResponse extends VehiculoDetalleResponse {
    puertas: number;
    potencia: number;
    tipoAuto: string;
    descripcion: string;
    tipoDeTraccion: string;
    transmision: string;
}

export interface CrearAutoRequest extends CrearVehiculoRequest {
    idTrim: number;
    precio: number;
    color: string;
    kilometraje: number;
    patente: string;
}
