import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAccesoRapido } from './card-acceso-rapido';

describe('CardAccesoRapido', () => {
  let component: CardAccesoRapido;
  let fixture: ComponentFixture<CardAccesoRapido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAccesoRapido],
    }).compileComponents();

    fixture = TestBed.createComponent(CardAccesoRapido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
