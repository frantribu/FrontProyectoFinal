import { EnumResponse } from "./Enum";

export interface UsuarioResponse{
    id:number;
    nombre:string;
    apellido:string;
    rol:string;
    email:string;
    activo:boolean;
}

export interface UsuarioRequest{
    nombre: String;
    apellido: String;
    dni:number;
    rol: String;
    email: String;
    password: String;
}