import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTalleres } from './list-talleres';

describe('ListTalleres', () => {
  let component: ListTalleres;
  let fixture: ComponentFixture<ListTalleres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTalleres],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTalleres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
