import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAngularLibComponent } from './super-angular-lib.component';

describe('SuperAngularLibComponent', () => {
  let component: SuperAngularLibComponent;
  let fixture: ComponentFixture<SuperAngularLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAngularLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAngularLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
