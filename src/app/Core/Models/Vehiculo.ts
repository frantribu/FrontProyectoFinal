export interface VehiculoResponse{
    id:number;
    marca:string;
    modelo:string;
    version:string;
    precio:number;
    tipo:string;
    kilometraje:number;
    fechaIngreso:Date;
    estado:string;
    patente:string;
    anio:number;
}

export interface VehiculoDetalleResponse{
    id:number;
    patente:string;
    marca:string;
    modelo:string;
    version:string;
    precio:number;
    color:string;
    anio:number;
    kilometraje:number;
    motor:string;
    combustion:string;
    tipo:string;
    fechaIngreso:Date;
    imagenes:File[] | null;
}


export interface Submodelo{
    id:number,
    description:string
}

export interface CrearVehiculoRequest{
    idTrim:number,
    precio:number,
    kilometraje:number,
    patente:string,
    color:string,
}