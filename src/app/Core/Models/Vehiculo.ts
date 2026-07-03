import { EnumResponse } from "./Enum";

export interface VehiculoResponse {
    id: number;
    marca: string;
    modelo: string;
    version: string;
    precioCompra: number;
    precioVenta:number;
    tipo: string;
    kilometraje: number;
    fechaIngreso: Date;
    estado: EnumResponse;
    patente: string;
    anio: number;
}

export interface VehiculoDetalleResponse extends VehiculoResponse {
    color: string;
    motor: string;
    combustion: string;
    descripcion: string;
    imagenes: string[] | null;
}

export interface VehiculoReparacionResponse{
    id:number;
    marca:string;
    modelo:string;
    version:string;
    tipo:string;
}

export interface CrearVehiculoRequest {
    precioCompra: number,
    precioVenta:number,
    kilometraje: number,
    patente: string,
    color: string
    descripcion:string;
}

