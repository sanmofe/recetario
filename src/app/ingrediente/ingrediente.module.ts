import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { IngredienteListaComponent } from './ingrediente-lista/ingrediente-lista.component';
import { IngredienteCrearComponent } from './ingrediente-crear/ingrediente-crear.component';
import { IngredienteEditarComponent } from './ingrediente-editar/ingrediente-editar.component';
import { EncabezadoRestaurante } from '../encabezado-restaurante/encabezado-restaurante.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule,
    EncabezadoRestaurante
  ],
  declarations: [
    IngredienteListaComponent,
    IngredienteCrearComponent,
    IngredienteEditarComponent
  ],
  exports: [
    IngredienteListaComponent,
    IngredienteCrearComponent,
    IngredienteEditarComponent
  ]
})
export class IngredienteModule { }
