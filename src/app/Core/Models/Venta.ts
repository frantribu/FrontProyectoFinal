export interface CrearVentaRequest{
    clienteId:number;
    precioVenta:number;
}

export interface VentaResponse{
    id:number;
    vehiculoId:number;
    clienteId:number;
    vendedorId:number;
    precioVenta:number;
    fechaVenta:Date;
}