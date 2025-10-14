import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewuploaddocumentcomponent } from './viewuploaddocumentcomponent';

describe('Viewuploaddocumentcomponent', () => {
  let component: Viewuploaddocumentcomponent;
  let fixture: ComponentFixture<Viewuploaddocumentcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewuploaddocumentcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewuploaddocumentcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
