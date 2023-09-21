import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';

import { MenuCrearComponent } from './menu-crear/menu-crear.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EncabezadoAppModule
    ],
    declarations: [
        MenuCrearComponent
    ],
    exports: [
        MenuCrearComponent
    ]
    }) export class MenuModule { }