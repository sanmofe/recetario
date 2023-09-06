// HU: REC-6
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '../restaurante';
import { RestauranteService } from '../restaurante.service';

@Component({
  selector: 'app-restaurante-crear',
  templateUrl: './restaurante-crear.component.html',
  styleUrls: ['./restaurante-crear.component.css']
})
export class RestauranteCrearComponent implements OnInit {

  restauranteForm: FormGroup;
  listaOpciones

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private restauranteService: RestauranteService,
  ) { }

  ngOnInit() {
    this.listaOpciones = [
      { id: 1, nombre: 'En el lugar' },
      { id: 2, nombre: 'Llevar' },
      { id: 3, nombre: 'Domicilio' }
    ];

    this.restauranteForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(200)]],
      direccion: ["", [Validators.required, Validators.maxLength(200)]],
      telefono: ["", [Validators.required, Validators.maxLength(200)]],
      redesSociales: ["", [Validators.required, Validators.maxLength(500)]],
      horario: ["", [Validators.required, Validators.maxLength(500)]],
      tipoComida: ["", [Validators.required, Validators.maxLength(500)]],
      apps: ["", [Validators.required, Validators.maxLength(500)]],
      opciones: ["", [Validators.required]]
    });

  }

  crearRestaurante(nuevoRestaurante: Restaurante): void {
    this.restauranteService.crearRestaurante(nuevoRestaurante).subscribe((restaurante) => {
      this.toastr.success("Confirmation", "Registro creado")
      this.restauranteForm.reset();
      this.routerPath.navigate(['/restaurantes/']);
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else if (error.status === 404) {
        this.toastr.error("Error","El nombre del restaurante ya existe, por favor ingrese otro nombre.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    })

  }

  cancelarRestaurante(): void {
    this.restauranteForm.reset();
    this.routerPath.navigate(['/restaurantes/']);
  }

}
