import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTallerModal } from './asignar-taller-modal';

describe('AsignarTallerModal', () => {
  let component: AsignarTallerModal;
  let fixture: ComponentFixture<AsignarTallerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarTallerModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignarTallerModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
