import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '../../restaurante/restaurante';
import { EncabezadoRestauranteService } from '../encabezado-restaurante.service';


@Component({
    selector: 'app-encabezado-restaurante',
    templateUrl: './encabezado.component.html',
    styleUrls: ['./encabezado.component.css']
  })
  export class EncabezadoComponent implements OnInit {
    
    //restaurante: string;
    restaurante: Restaurante
    constructor(
        private routerPath: Router,
        private router: ActivatedRoute,
        private toastr: ToastrService,
        private encabezadoRestauranteService: EncabezadoRestauranteService
      ) { }
  
      ngOnInit() {
        this.encabezadoRestauranteService.darRestaurante(sessionStorage['restaurante']).subscribe((restaurante) => {
          this.restaurante = restaurante;
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