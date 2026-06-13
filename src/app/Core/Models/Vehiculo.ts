export interface VehiculoResponse {
    id: number;
    marca: string;
    modelo: string;
    version: string;
    precio: number;
    tipo: string;
    kilometraje: number;
    fechaIngreso: Date;
    estado: string;
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

export interface Submodelo {
    id: number,
    description: string
}

export interface CrearVehiculoRequest {
    precio: number,
    kilometraje: number,
    patente: string,
    color: string
}