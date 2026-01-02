import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMockComponent } from './navbar-mock.component';

describe('NavbarMockComponent', () => {
  let component: NavbarMockComponent;
  let fixture: ComponentFixture<NavbarMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarMockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
