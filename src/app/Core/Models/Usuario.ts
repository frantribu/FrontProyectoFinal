export interface Usuario{
    id:Number;
    nombre:String;
    apellido:String;
    rol:String;
    email:String;
    activo:Boolean;
}

export interface Rol{
    nombre:string;
    label:string;
}

export interface UsuarioRequest{
    id : Number;
    nombre: String;
    apellido: String;
    rol: String;
    email: String;
    password: String;
}