import { VentaResponse } from "./Venta";

export interface ClienteResponse {
    id: number;
    nombre: string;
    apellido: string;
    dni: number;
    activo: boolean;
    telefono: string;
}

export interface ClienteDetalleResponse extends ClienteResponse {
    email: string;
    historialVenta: VentaResponse[];
}

export interface ClienteRequest {
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    telefono: string;
}