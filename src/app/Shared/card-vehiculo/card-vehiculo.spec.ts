import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVehiculo } from './card-vehiculo';

describe('CardVehiculo', () => {
  let component: CardVehiculo;
  let fixture: ComponentFixture<CardVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVehiculo],
    }).compileComponents();

    fixture = TestBed.createComponent(CardVehiculo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
