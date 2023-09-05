import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefCrearComponent } from './chef-crear.component';

describe('ChefCrearComponent', () => {
  let component: ChefCrearComponent;
  let fixture: ComponentFixture<ChefCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
