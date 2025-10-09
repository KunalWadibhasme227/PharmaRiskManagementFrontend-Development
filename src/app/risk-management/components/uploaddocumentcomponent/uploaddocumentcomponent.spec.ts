import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploaddocumentcomponent } from './uploaddocumentcomponent';

describe('Uploaddocumentcomponent', () => {
  let component: Uploaddocumentcomponent;
  let fixture: ComponentFixture<Uploaddocumentcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uploaddocumentcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uploaddocumentcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
