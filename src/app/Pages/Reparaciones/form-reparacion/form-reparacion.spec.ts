import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReparacionComponent } from './form-reparacion';

describe('FormReparacionComponent', () => {
  let component: FormReparacionComponent;
  let fixture: ComponentFixture<FormReparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormReparacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormReparacionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
