import { EnumResponse } from "./Enum";
import { CrearVehiculoRequest, VehiculoDetalleResponse } from "./Vehiculo";

export interface MotoDetalleResponse extends VehiculoDetalleResponse {
    tipoMoto: EnumResponse;
    cilindrada: number;
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