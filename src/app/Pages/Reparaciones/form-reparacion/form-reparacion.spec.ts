import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReparacion } from './form-reparacion';

describe('FormReparacion', () => {
  let component: FormReparacion;
  let fixture: ComponentFixture<FormReparacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormReparacion],
    }).compileComponents();

    fixture = TestBed.createComponent(FormReparacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
