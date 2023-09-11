import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefListaComponent } from './chef-lista/chef-lista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { ChefCrearComponent } from './chef-crear/chef-crear.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule
  ],
  declarations: [
    ChefListaComponent,
    ChefCrearComponent
  ],
  exports: [
    ChefListaComponent
  ]
})
export class ChefModule { }
