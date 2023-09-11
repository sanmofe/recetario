import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefListaComponent } from './chef-lista.component';

describe('ChefListaComponent', () => {
  let component: ChefListaComponent;
  let fixture: ComponentFixture<ChefListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
