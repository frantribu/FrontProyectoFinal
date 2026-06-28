import { EnumResponse } from "./Enum";
import { HistorialReparacionResponse } from "./HistorialReparacion";
import { Usuario } from "./Usuario";

export interface TallerResponse {
    id: number;
    especialidad: EnumResponse;
    nombre: string;
    activo: boolean;
    reparacionesActivas: number;
    direccion: string;
    encargadoTaller: Usuario;
}

export interface TallerDetalleResponse extends TallerResponse{
    historialReparaciones: HistorialReparacionResponse[];
}

export interface CrearTallerRequest {
    especialidad: string;
    nombre: string;
    idEncargadoTaller: number;
    direccion: string;
}

export interface AsignarTallerRequest {
    idVehiculo: number;
    idTaller: number;
    motivo: string;
}