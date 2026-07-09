export interface ClienteResponse{
    id:number;
    nombre:string;
    apellido:string;
    dni:number;
   activo:boolean;
}

export interface ClienteRequest{
    id:number;
    nombre:string;
    apellido:string;
    dni:number;
    email:string;
    telefono:number;
}