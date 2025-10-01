import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewaudits } from './viewaudits';

describe('Viewaudits', () => {
  let component: Viewaudits;
  let fixture: ComponentFixture<Viewaudits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewaudits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewaudits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
