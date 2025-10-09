import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheduleauditscomponent } from './scheduleauditscomponent';

describe('Scheduleauditscomponent', () => {
  let component: Scheduleauditscomponent;
  let fixture: ComponentFixture<Scheduleauditscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scheduleauditscomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scheduleauditscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
