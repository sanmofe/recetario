import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChefService } from '../chef.service';
@Component({
  selector: 'app-chef-crear',
  templateUrl: './chef-crear.component.html',
  styleUrls: ['./chef-crear.component.css']
})
export class ChefCrearComponent implements OnInit {

  usuarioForm: FormGroup;

  constructor(
    private chef$: ChefService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ){
    this.usuarioForm = new FormGroup('')
  }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      usuario: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
    });
  }

  registrarChef(){
    this.chef$.registro(this.usuarioForm.get('usuario')?.value, this.usuarioForm.get('password')?.value, this.usuarioForm.get('nombre')?.value)
    .subscribe(res => {
      this.router.navigate([`/chefs`])
    },
      error => {
        this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
      })
  }

  cancelarRegistro(){

  }

}
