import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewfindingdetails } from './viewfindingdetails';

describe('Viewfindingdetails', () => {
  let component: Viewfindingdetails;
  let fixture: ComponentFixture<Viewfindingdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewfindingdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewfindingdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
