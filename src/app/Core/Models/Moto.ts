import { CrearVehiculoRequest, VehiculoDetalleResponse } from "./Vehiculo";

export interface MotoDetalleResponse extends VehiculoDetalleResponse {
    TipoDeMoto: String;
    Cilindrada: Number;
}

export interface CrearMotoRequest extends CrearVehiculoRequest{
    marca:string;
    modelo:string;
    version:string;
    anio:number;
    motor:string;
    combustion:string;
    cilindrada:number;
    tipoMoto:string;
}

export interface TipoMoto{
    name:String,
    label:String;
}