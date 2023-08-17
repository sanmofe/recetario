import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ingrediente } from '../ingrediente';
import { IngredienteService } from '../ingrediente.service';

@Component({
  selector: 'app-ingrediente-crear',
  templateUrl: './ingrediente-crear.component.html',
  styleUrls: ['./ingrediente-crear.component.css']
})
export class IngredienteCrearComponent implements OnInit {

  ingredienteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private ingredienteService: IngredienteService
  ) { }

  ngOnInit() {
    this.ingredienteForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      unidad: ["", [Validators.required, Validators.minLength(2)]],
      costo: ["", Validators.required],
      calorias: ["", Validators.required],
      sitio: ["", [Validators.required, Validators.minLength(2)]]
    });
  }

  crearIngrediente(ingrediente: Ingrediente): void {
    this.ingredienteService.crearIngrediente(ingrediente).subscribe((ingrediente) => {
      this.toastr.success("Confirmation", "Registro creado")
      this.ingredienteForm.reset();
      this.routerPath.navigate(['/ingredientes/']);
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

  cancelarIngrediente(): void {
    this.ingredienteForm.reset();
    this.routerPath.navigate(['/ingredientes/']);
  }

}
