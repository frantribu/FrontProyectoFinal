import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMoto } from './detalle-moto';

describe('DetalleMoto', () => {
  let component: DetalleMoto;
  let fixture: ComponentFixture<DetalleMoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMoto],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleMoto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
