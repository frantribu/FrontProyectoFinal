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
    imagenes: File[] | null;
}

export interface AutoDetalleResponse extends VehiculoDetalleResponse {
    puertas: number;
    potencia: number;
    tipoAuto: string,
    tipoDeTraccion: string;
    transmision: string;
}

export interface MotoDetalleResponse extends VehiculoDetalleResponse {
    cilindrada: string;
    tipoMoto: string;
}

export interface Submodelo {
    id: number,
    description: string
}

export interface CrearVehiculoRequest {
    idTrim: number,
    precio: number,
    kilometraje: number,
    patente: string,
    color: string,
}