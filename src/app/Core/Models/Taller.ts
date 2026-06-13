import { historialReparacionResponse } from "./HistorialReparacion";
import { Usuario } from "./Usuario";

export interface TallerResponse{
    id:number;
    especialidad:string;
    nombre:string;
    activo:boolean;
}

export interface TallerDetalleResponse{
    id:number;
    especialidad:string;
    nombre:string;
    activo:boolean;
    encargadoTaller:Usuario;
    direccion:string;
    historialReparacion:historialReparacionResponse[];
}

export interface CrearTallerRequest{
    especialidad:string;
    nombre:string;
    idEncargadoTaller:number;
    direccion:string;
}

export interface Especialidades{
    nombre:string;
    label:string;
}