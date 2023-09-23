import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { Menu } from './menu';

@Injectable({
  providedIn: 'root'
}) 
export class MenuService {

  private apiUrl = environment.apiUrl;
  existe:boolean;

  constructor(
    private http: HttpClient
  ) { }

  darMenus(): Observable<Menu[]> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const rol = sessionStorage.getItem('rol');
    const idParent = sessionStorage.getItem('idParent');
    var idAdminChef = idUsuario
    if (rol == "CHEF") {
      idAdminChef = idParent
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      "Access-Control-Allow-Origin": "*"
    })
    return this.http.get<Menu[]>(`${this.apiUrl}/${rol.toLowerCase()}/menus/${idAdminChef}`, { headers: headers })
  }

  darMenu(idMenu: number): Observable<Menu> {

    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Menu>(`${this.apiUrl}/menu/${idMenu}`, { headers: headers })
  }

  crearMenu(menu: Menu): Observable<Menu> {

    const idUsuario = sessionStorage.getItem('idUsuario');
    const rol = sessionStorage.getItem('rol');
    const idParent = sessionStorage.getItem('idParent');
    let idConsulta = idUsuario;

    if (rol == "CHEF") {
      idConsulta = idParent;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      "Access-Control-Allow-Origin": "*"
    })

    

    return this.http.post<Menu>(`${this.apiUrl}/${rol.toLowerCase()}/menus/${idConsulta}`, menu, { headers: headers })
  }

  borrarMenu(idMenu: number): Observable<Menu> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.delete<Menu>(`${this.apiUrl}/menu/${idMenu}`, { headers: headers })

  }
  verificarMenuSemanal(fechaInicio: string, fechaFin: string): Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<{ existe: boolean }>(`${this.apiUrl}/menus/verificar`, { headers: headers,fechaInicio,fechaFin })

  }

}




