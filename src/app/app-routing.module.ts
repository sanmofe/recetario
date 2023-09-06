import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { RecetaListaComponent } from './receta/receta-lista/receta-lista.component';
import { RecetaCrearComponent } from './receta/receta-crear/receta-crear.component';
import { RecetaEditarComponent } from './receta/receta-editar/receta-editar.component';

// HU: REC-4 y REC-6
import { RestauranteListaComponent } from './restaurante/restaurante-lista/restaurante-lista.component';
import { RestauranteCrearComponent } from './restaurante/restaurante-crear/restaurante-crear.component';
import { RestauranteEditarComponent } from './restaurante/restaurante-editar/restaurante-editar.component';

import { IngredienteListaComponent } from './ingrediente/ingrediente-lista/ingrediente-lista.component';
import { IngredienteCrearComponent } from './ingrediente/ingrediente-crear/ingrediente-crear.component';
import { IngredienteEditarComponent } from './ingrediente/ingrediente-editar/ingrediente-editar.component';
import { ChefListaComponent } from './chef/chef-lista/chef-lista.component';
import { ChefCrearComponent } from './chef/chef-crear/chef-crear.component';

const routes: Routes = [
  { path: '', component: UsuarioLoginComponent, pathMatch: 'full' },
  { path: 'registro', component: UsuarioRegistroComponent,  pathMatch: 'full' },
  { path: 'recetas', component: RecetaListaComponent, pathMatch: 'full'},
  { path: 'receta/crear', component: RecetaCrearComponent, pathMatch: 'full'},
  { path: 'receta/editar/:id', component: RecetaEditarComponent, pathMatch: 'full'},

  { path: 'restaurantes', component: RestauranteListaComponent, pathMatch: 'full'},
  { path: 'restaurante/crear', component: RestauranteCrearComponent, pathMatch: 'full'},
  { path: 'restaurante/editar/:id', component: RestauranteEditarComponent, pathMatch: 'full'},

  { path: 'ingredientes', component: IngredienteListaComponent, pathMatch: 'full'},
  { path: 'ingrediente/crear', component: IngredienteCrearComponent, pathMatch: 'full'},
  { path: 'ingrediente/editar/:id', component: IngredienteEditarComponent, pathMatch: 'full'},
  { path: 'chefs', component: ChefListaComponent, pathMatch: 'full' },
  { path: 'chef/crear', component: ChefCrearComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
