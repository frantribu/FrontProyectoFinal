export interface UsuarioResponse{
    id:number;
    nombre:string;
    apellido:string;
    dni:number;
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

export interface UpdateUsuarioRequest{
    dni:number;
    nombre:string;
    apellido:string;
    email:string;
}