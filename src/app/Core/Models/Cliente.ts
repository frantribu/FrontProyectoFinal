export interface ClienteResponse {
    id: number;
    nombre: string;
    apellido: string;
    dni: number;
    activo: boolean;
}

export interface CrearClienteRequest {
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    telefono: number;
}