// HU: REC-4 y REC-6
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';

import { RestauranteListaComponent } from './restaurante-lista/restaurante-lista.component';
import { RestauranteCrearComponent } from './restaurante-crear/restaurante-crear.component';
import { RestauranteEditarComponent } from './restaurante-editar/restaurante-editar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule
  ],
  declarations: [
    RestauranteListaComponent,
    RestauranteCrearComponent,
    RestauranteEditarComponent
  ],
  exports: [
    RestauranteListaComponent,
    RestauranteCrearComponent,
    RestauranteEditarComponent
  ]
})
export class RestauranteModule { }
