import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVehiculo } from './detalle-vehiculo';

describe('DetalleVehiculo', () => {
  let component: DetalleVehiculo;
  let fixture: ComponentFixture<DetalleVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVehiculo],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleVehiculo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
