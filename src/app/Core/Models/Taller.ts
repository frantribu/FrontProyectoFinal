import { historialReparacionResponse } from "./HistorialReparacion";
import { Usuario } from "./Usuario";

export interface TallerResponse {
    id: number;
    especialidad: string;
    nombre: string;
    activo: boolean;
    reparacionesActivas: number;
    direccion: string;
    encargadoTaller: Usuario;
}

export interface TallerDetalleResponse extends TallerResponse{
    historialReparaciones: historialReparacionResponse[];
}

export interface CrearTallerRequest {
    especialidad: string;
    nombre: string;
    idEncargadoTaller: number;
    direccion: string;
}

export interface Especialidades {
    nombre: string;
    label: string;
}

export interface AsignarTallerRequest {
    idVehiculo: number;
    idTaller: number;
    motivo: string;
}