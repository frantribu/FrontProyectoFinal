import { CrearVehiculoRequest, VehiculoDetalleResponse } from "./Vehiculo";

export interface AutoDetalleResponse extends VehiculoDetalleResponse {
    puertas: number;
    potencia: number;
    tipoAuto: string;
    tipoDeTraccion: string;
    transmision: string;
    idTrim:number;
}

export interface CrearAutoRequest extends CrearVehiculoRequest{
    idTrim: number,
}

export interface Submodelo {
    id: number,
    description: string
}