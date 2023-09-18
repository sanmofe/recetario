// HU: REC-4
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '../restaurante';
import { RestauranteService } from '../restaurante.service';

@Component({
  selector: 'app-restaurante-lista',
  templateUrl: './restaurante-lista.component.html',
  styleUrls: ['./restaurante-lista.component.css']
})
export class RestauranteListaComponent implements OnInit {

  restaurantes:Array<Restaurante> = []
  restauranteElegida: Restaurante

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private restauranteService: RestauranteService
  ) { }

  ngOnInit() {
    this.restauranteService.darRestaurantes().subscribe((restaurantes) => {
      this.restaurantes = restaurantes;
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    });
  }

  crearRestaurante():void {
    this.routerPath.navigate(['/restaurante/crear/']);
  }

  editarRestaurante(idRestaurante: number):void {
    this.routerPath.navigate(['/restaurante/editar/' + idRestaurante]);
  }

  verEmpleados(idRestaurante: number):void {
    this.routerPath.navigate(['/restaurante/' + idRestaurante + '/chefs']);
  }

  borrarRestaurante(idRestaurante: number):void {
    this.restauranteService.borrarRestaurante(idRestaurante).subscribe((restaurante) => {
      this.toastr.success("Confirmation", "Registro eliminado de la lista")
      this.ngOnInit();
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    });
  }


}
