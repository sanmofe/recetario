import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment'
import { Usuario } from '../usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  registro(usuario: string, contrasena: string, nombre: string): Observable<any> {
    const head = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    const idUsuario = sessionStorage.getItem('idUsuario');
    return this.http.post<any>(`${this.apiUrl}/chefs/${idUsuario}`, { "usuario": usuario, "contrasena": contrasena, "nombre": nombre }, {headers: head})  }

  darChefs(): Observable<Usuario[]> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    console.log("Id Usuario: " + idUsuario)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Usuario[]>(`${this.apiUrl}/chefs/${idUsuario}`, { headers: headers })
  }
    
}
