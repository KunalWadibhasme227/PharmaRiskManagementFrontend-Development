import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addfindings } from './addfindings';

describe('Addfindings', () => {
  let component: Addfindings;
  let fixture: ComponentFixture<Addfindings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addfindings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addfindings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
