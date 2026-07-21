import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { VehiculoService } from '../../Services/VehiculoService/vehiculo-service';
import { map } from 'rxjs';

export const vehiculoDisponibleGuard: CanActivateFn = (route, state) => {
  const vehiculoService=inject(VehiculoService);
  const id=Number(route.paramMap.get("id"));
  const router=inject(Router);

  return vehiculoService.getDetalleVehiculo(id)
  .pipe(
    map(vehiculo=>{
      if(vehiculo.estado.name.toLowerCase()!=="disponible"){
        return router.createUrlTree(['/vehiculos']);
      }
      return true;
    })
  )
};
