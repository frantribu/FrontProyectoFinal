import { VehiculoReparacionResponse } from "./Vehiculo";

export interface historialReparacionResponse{
    id:number;
    idTaller:number;
    vehiculo:VehiculoReparacionResponse;
    fechaDeEntrada:Date;
    fechaDeSalida:Date;
    descripcion:string;
    estadoReparacion:string;
}