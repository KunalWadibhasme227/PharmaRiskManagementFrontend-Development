import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addmaterial } from './addmaterial';

describe('Addmaterial', () => {
  let component: Addmaterial;
  let fixture: ComponentFixture<Addmaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addmaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addmaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
