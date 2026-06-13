import { Usuario } from "./Usuario";

export interface LoginRequest{
    email:string,
    password:string
}

export interface LoginResponse{
    token:string;
    usuario:Usuario;
}