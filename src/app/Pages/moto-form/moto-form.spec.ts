import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoForm } from './moto-form';

describe('MotoForm', () => {
  let component: MotoForm;
  let fixture: ComponentFixture<MotoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MotoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
