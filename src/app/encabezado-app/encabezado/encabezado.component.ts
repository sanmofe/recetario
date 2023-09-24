import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '../../restaurante/restaurante';
import { EncabezadoAppService } from '../encabezado-app.service';
@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  user_type: string;
  restaurante: Restaurante;


  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private encabezadoRestauranteService: EncabezadoAppService,
    private http: HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  })
      
  this.http.get<{ user_type: string }>(`${this.apiUrl}/api/user-type`, { headers: headers }).subscribe(data => {
    this.user_type = data.user_type;
    sessionStorage.setItem('rol', this.user_type);
    console.log(this.user_type)

    if (this.user_type == "CHEF"){
    
      this.encabezadoRestauranteService.darRestaurante(sessionStorage['restaurante']).subscribe((restaurante) => {
        this.restaurante = restaurante;
        console.log(restaurante.nombre)
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
      });}

  });



}

}
