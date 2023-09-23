import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Menu } from '../menu';
import { MenuService } from '../menu.service';
import { DatePipe } from '@angular/common';
import { RecetaService } from 'src/app/receta/receta.service';
import { Receta } from 'src/app/receta/receta';


@Component({
    selector: 'app-restaurante-crear',
    templateUrl: './menu-crear.component.html',
    styleUrls: ['./menu-crear.component.css']
})
    export class MenuCrearComponent implements OnInit {
        menuForm: FormGroup;
        recetasSubForm: FormArray;
        listaRecetas: any;

        autor: string = sessionStorage.getItem("username");
        ahora: any;
        deshabilitar:any;
        fechaInicio :string;
        minFechaInicio: string; // Fecha mínima para Fecha de Inicio
        maxFechaInicio: string; // Fecha máxima para Fecha de Inicio
        
        minFechaFin: string;    // Fecha mínima para Fecha de Fin
        maxFechaFin: string;   // Fecha máxima para Fecha de Fin
        constructor(
            private formBuilder: FormBuilder,
            private routerPath: Router,
            private toastr: ToastrService,
            private menuService: MenuService,
            private recetaService: RecetaService,
        ) { }

        ngOnInit(): void {
            //this.minFechaInicio = this.obtenerLunesActual();


            this.recetasSubForm = this.formBuilder.array([
                this.formBuilder.group({
                  id:[""],
                  num_personas: ["", Validators.required],
                  idReceta: ["", Validators.required]
                  })
              ])

            this.minFechaInicio = this.obtenerLunesActual();
            this.maxFechaInicio = this.minFechaInicio;
            this.minFechaFin = this.obtenerViernesDeMismaSemana(this.minFechaInicio);
            this.maxFechaFin = this.obtenerViernesActual();
            this.menuForm = this.formBuilder.group({
                nombre: ["", [Validators.required, Validators.maxLength(200)]],
                fechaInicio: [this.obtenerLunesActual(), [Validators.required]],
                fechaFin: [this.obtenerViernesActual(), [Validators.required]],
                autor: [sessionStorage['username'], [Validators.required, Validators.maxLength(200)]],
                descripcion: ["", [Validators.required, Validators.minLength(2)]],
                recetas: this.recetasSubForm,
            });
            const datePipe = new DatePipe('en-US');
            this.ahora = datePipe.transform(new Date(), 'dd/M/yyyy');

            this.menuForm.get('fechaInicio').valueChanges.subscribe((fechaInicio) => {
                // Actualiza la fecha máxima para la fecha de fin
                this.maxFechaFin = this.obtenerViernesDeMismaSemana(fechaInicio);
                this.menuForm.get('fechaFin').setValue(this.maxFechaFin);
              });

            this.recetaService.darRecetas().subscribe((recetas) => {
            this.listaRecetas = recetas
            });
        }

        cambioFecha(){
            this.deshabilitar = this.fechaInicio;
        }

        crearMenu(nuevoMenu: Menu): void {
            this.menuService.crearMenu(nuevoMenu).subscribe((menu) => {
                this.toastr.success("Confirmation", "Registro creado")
                this.toastr.warning("Warning", "Por favor agregue las recetas al menú.")
                this.menuForm.reset();
                this.routerPath.navigate(['/menus/']);
            },
                error => {
                    if (error.statusText === "UNAUTHORIZED") {
                        this.toastr.error("Error", "Su sesión ha caducado, por favor vuelva a iniciar sesión.")
                    }
                    else if (error.statusText === "UNPROCESSABLE ENTITY") {
                        this.toastr.error("Error", "No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
                    }
                    else if (error.status === 404) {
                        this.toastr.error("Error", "El menú ya existe esa semana, por favor edite el menú de esa semana.")
                    }
                });

        }
        verificarMenuSemanal(nuevoMenu): void {
            this.menuService.verificarMenuSemanal(nuevoMenu.fechaInicio,nuevoMenu.fechaFin).subscribe((response) => {
                if(response.existeMenu){
                    this.toastr.error("Error", "Ya existe un menu semanal en ese rango de fechas.")
                }
                else{
                    this.crearMenu(this.menuForm.value);
                }
            },
                error => {
                    if (error.statusText === "UNAUTHORIZED") {
                        this.toastr.error("Error", "Su sesión ha caducado, por favor vuelva a iniciar sesión.")
                    }
                    else if (error.statusText === "UNPROCESSABLE ENTITY") {
                        this.toastr.error("Error", "No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
                    }
                    else if (error.status === 404) {
                        this.toastr.error("Error", "El nombre del menu ya existe, por favor ingrese otro nombre.")
                    }
                });
        }
        cancelarMenu(): void {
            this.menuForm.reset();
            this.routerPath.navigate(['/menus/']);
          }


          obtenerLunesActual(): string {
            const hoy = new Date();
            const diaSemana = hoy.getDay(); // 0 para domingo, 1 para lunes, 2 para martes, etc.
            const diferenciaDias = 1 - diaSemana; // Diferencia para llegar al lunes
        
            const lunes = new Date();
            lunes.setDate(hoy.getDate() + diferenciaDias);
        
            return lunes.toISOString().split('T')[0]; // Formato yyyy-mm-dd
          }
        
          obtenerViernesActual(): string {
            const hoy = new Date();
            const diaSemana = hoy.getDay(); // 0 para domingo, 1 para lunes, 2 para martes, etc.
            const diferenciaDias = 5 - diaSemana; // Diferencia para llegar al viernes
        
            const viernes = new Date();
            viernes.setDate(hoy.getDate() + diferenciaDias);
        
            return viernes.toISOString().split('T')[0]; // Formato yyyy-mm-dd
          }
          obtenerLunesDeMismaSemana(fechaInicio: string): string {
            const fechaInicioDate = new Date(fechaInicio);
            const diaSemana = fechaInicioDate.getDay(); // 0 para domingo, 1 para lunes, 2 para martes, etc.
            
            // Calcula la diferencia de días necesaria para llegar al lunes (1 para lunes)
            const diferenciaDias = 1 - diaSemana;
          
            // Clona la fecha de inicio y suma la diferencia de días para obtener el lunes
            const fechaLunes = new Date(fechaInicioDate);
            fechaLunes.setDate(fechaInicioDate.getDate() + diferenciaDias);
          
            // Formatea la fecha en formato yyyy-mm-dd
            const fechaLunesFormateada = fechaLunes.toISOString().split('T')[0];
          
            return fechaLunesFormateada;
          }
          obtenerViernesDeMismaSemana(fechaInicio: string): string {
            const fechaInicioDate = new Date(fechaInicio);
            const diaSemana = fechaInicioDate.getDay(); // 0 para domingo, 1 para lunes, 2 para martes, etc.
            
            // Calcula la diferencia de días necesaria para llegar al viernes (5 para viernes)
            const diferenciaDias = 4 - diaSemana;
          
            // Clona la fecha de inicio y suma la diferencia de días para obtener el viernes
            const fechaViernes = new Date(fechaInicioDate);
            fechaViernes.setDate(fechaInicioDate.getDate() + diferenciaDias);
          
            // Formatea la fecha en formato yyyy-mm-dd
            const fechaViernesFormateada = fechaViernes.toISOString().split('T')[0];
          
            return fechaViernesFormateada;
          }

          adicionarReceta(): void {
            const filaNueva = this.formBuilder.group({
              id:[""],
              num_personas: ["", Validators.required],
              idReceta: ["", Validators.required]
              })
      
              this.recetasSubForm.push(filaNueva)
          }

          eliminarReceta(index: number): void {
            this.recetasSubForm.removeAt(index);
          }

    }