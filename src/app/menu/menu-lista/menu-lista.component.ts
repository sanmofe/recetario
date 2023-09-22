import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Menu } from '../menu';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  user_type: string;
  menus:Array<Menu> = []

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private menuService: MenuService,
    private http: HttpClient
  ) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    this.http.get<{ user_type: string }>(`${this.apiUrl}/api/user-type`, { headers: headers }).subscribe(data => {
      this.user_type = data.user_type;
      console.log("Listar menus tipo de usuario: ")
      console.log(this.user_type)
  
      this.menuService.darMenus().subscribe((menus) => {
        this.menus = menus;
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
    });  
  }

  crearMenu():void {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const rol = sessionStorage.getItem('rol');
    
    this.routerPath.navigate(['/' + rol.toLowerCase() + '/menus/' + idUsuario]);
  }

  editarMenu(idMenu: number):void {
    this.routerPath.navigate(['/menu/editar/' + idMenu]);
  }

  borrarMenu(idMenu: number):void {
    this.menuService.borrarMenu(idMenu).subscribe((menu) => {
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
