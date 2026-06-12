import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoFormComponent } from './moto-form';

describe('MotoForm', () => {
  let component: MotoFormComponent;
  let fixture: ComponentFixture<MotoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MotoFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
