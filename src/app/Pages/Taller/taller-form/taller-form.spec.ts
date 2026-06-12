import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerForm } from './taller-form';

describe('TallerForm', () => {
  let component: TallerForm;
  let fixture: ComponentFixture<TallerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TallerForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TallerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
