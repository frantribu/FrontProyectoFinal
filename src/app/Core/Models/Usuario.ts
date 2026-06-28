export interface UsuarioResponse{
    id:number;
    nombre:string;
    apellido:string;
    rol:string;
    email:string;
    activo:boolean;
}

export interface UsuarioRequest{
    id : Number;
    nombre: String;
    apellido: String;
    rol: String;
    email: String;
    password: String;
}