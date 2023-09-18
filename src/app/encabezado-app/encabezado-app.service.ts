import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { Restaurante } from '../restaurante/restaurante';

@Injectable({
  providedIn: 'root'
})
export class EncabezadoAppService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  darRestaurantes(): Observable<Restaurante[]> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurantes/${idUsuario}`, { headers: headers })
  }

  darRestaurante(idRestaurante: number): Observable<Restaurante> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Restaurante>(`${this.apiUrl}/restaurante/${idRestaurante}`, { headers: headers })
  }

  crearRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<Restaurante>(`${this.apiUrl}/restaurantes/${idUsuario}`, restaurante, { headers: headers })
  }

  editarRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.put<Restaurante>(`${this.apiUrl}/restaurante/${restaurante.id}`, restaurante, { headers: headers })
  }


  borrarRestaurante(idRestaurante: number): Observable<Restaurante> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.delete<Restaurante>(`${this.apiUrl}/restaurante/${idRestaurante}`, { headers: headers })
  }

}
