import { EnumResponse } from "./Enum";
import {VehiculoReparacionResponse } from "./Vehiculo";

export interface HistorialReparacionResponse{
    id:number;
    idTaller:number;
    vehiculo:VehiculoReparacionResponse;
    fechaDeEntrada:Date;
    fechaDeSalida:Date;
    descripcion:string;
    estadoReparacion:EnumResponse;
}

export type EstadoReparacion = 'INGRESO' | 'DIAGNOSTICO' | 'REPARACION' | 'PRUEBA' | 'FINALIZADO' | 'ENTREGADO'