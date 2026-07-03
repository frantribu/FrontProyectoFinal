import { ClienteResponse } from "./Cliente";
import { UsuarioResponse } from "./Usuario";
import { VehiculoResponse } from "./Vehiculo";

export interface CrearVentaRequest{
    clienteId:number;
    precioVenta:number;
}

export interface VentaResponse{
    id:number;
    vehiculo:VehiculoResponse;
    cliente:ClienteResponse;
    vendedor:UsuarioResponse;
    precioFinalDeVenta:number;
    ganancia:number;
    fechaVenta:Date;
}