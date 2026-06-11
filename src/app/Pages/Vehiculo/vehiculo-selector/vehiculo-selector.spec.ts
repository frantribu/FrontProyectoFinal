import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoSelector } from './vehiculo-selector';

describe('VehiculoSelector', () => {
  let component: VehiculoSelector;
  let fixture: ComponentFixture<VehiculoSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculoSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
