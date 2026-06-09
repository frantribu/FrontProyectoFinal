import { CrearVehiculoRequest, VehiculoDetalleResponse } from "./Vehiculo";

export interface MotoDetalleResponse extends VehiculoDetalleResponse {
    TipoDeMoto: String;
    Cilindrada: Number;
}

export interface CrearMotoRequest extends CrearVehiculoRequest {
    TipoDeMoto: String;
    Cilindrada: Number;
}