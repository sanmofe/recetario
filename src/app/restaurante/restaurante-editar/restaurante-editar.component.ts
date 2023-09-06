import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '../restaurante';
import { RestauranteService } from '../restaurante.service';

@Component({
  selector: 'app-restaurante-editar',
  templateUrl: './restaurante-editar.component.html',
  styleUrls: ['./restaurante-editar.component.css']
})
export class RestauranteEditarComponent implements OnInit {

  restaurante: Restaurante
  restauranteForm: FormGroup = {} as FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private restauranteService: RestauranteService
  ) { }

  ngOnInit() {

    const idRestaurante = parseInt(this.router.snapshot.params['id']);

    this.restauranteService.darRestaurante(idRestaurante).subscribe((restaurante) => {
      this.restaurante = restaurante

      this.restauranteForm = this.formBuilder.group({
        id: [this.restaurante.id],
        nombre: [this.restaurante.nombre, [Validators.required, Validators.maxLength(200)]],
        direccion: [this.restaurante.direccion, [Validators.required, Validators.maxLength(200)]],
        telefono: [this.restaurante.telefono, [Validators.required, Validators.maxLength(200)]],
        redesSociales: [this.restaurante.redesSociales, [Validators.required, Validators.maxLength(500)]],
        horario: [this.restaurante.horario, [Validators.required, Validators.maxLength(500)]],
        tipoComida: [this.restaurante.tipoComida, [Validators.required, Validators.maxLength(500)]]
      });


    })

  }

  editarRestaurante(cambioRestaurante: Restaurante): void {
    this.restauranteService.editarRestaurante(cambioRestaurante).subscribe((restaurante) => {
      this.toastr.success("Confirmation", "Registro editado")
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
