import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';

import { MenuCrearComponent } from './menu-crear/menu-crear.component';
import { MenuListaComponent } from './menu-lista/menu-lista.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EncabezadoAppModule
    ],
    declarations: [
        MenuListaComponent,
        MenuCrearComponent
    ],
    exports: [
        MenuListaComponent,
        MenuCrearComponent
    ]
}) 
export class MenuModule { }