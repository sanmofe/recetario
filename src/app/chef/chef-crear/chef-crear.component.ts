import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ChefService } from '../chef.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-chef-crear',
  templateUrl: './chef-crear.component.html',
  styleUrls: ['./chef-crear.component.css']
})
export class ChefCrearComponent implements OnInit {

  usuarioForm: FormGroup;

  restauranteId: string;

  constructor(
    private chef$: ChefService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private _location: Location,
    private route: ActivatedRoute
  ){
    this.usuarioForm = new FormGroup('')
  }

  ngOnInit() {
    this.restauranteId = this.route.snapshot.paramMap.get('id');
    this.usuarioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      usuario: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
    });
  }

  registrarChef(){
    this.chef$.registro(this.usuarioForm.get('usuario')?.value, this.usuarioForm.get('password')?.value, this.usuarioForm.get('nombre')?.value, this.restauranteId)
    .subscribe(res => {
      this._location.back();
    },
      error => {
        this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
      })
  }

}
