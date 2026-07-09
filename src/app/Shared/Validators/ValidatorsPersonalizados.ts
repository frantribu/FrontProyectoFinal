import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ValidatorsPersonalizados{
    static validarPrecioDeCompraVenta(group:AbstractControl):ValidationErrors | null{
        const precioCompra=group.get("precioCompra")?.value;
        const precioVenta=group.get("precioVenta")?.value;

        if(precioCompra==null && precioVenta==null){
            return null;
        }

        if(precioCompra>=precioVenta){
            return {precioInvalido:true};
        }

        return null;
    }
}