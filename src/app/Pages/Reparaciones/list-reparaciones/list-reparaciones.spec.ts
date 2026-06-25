import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReparaciones } from './list-reparaciones';

describe('ListReparaciones', () => {
  let component: ListReparaciones;
  let fixture: ComponentFixture<ListReparaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReparaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(ListReparaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
