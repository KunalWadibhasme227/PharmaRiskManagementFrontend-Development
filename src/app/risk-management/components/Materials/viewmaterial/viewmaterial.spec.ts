import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewmaterial } from './viewmaterial';

describe('Viewmaterial', () => {
  let component: Viewmaterial;
  let fixture: ComponentFixture<Viewmaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewmaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewmaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
