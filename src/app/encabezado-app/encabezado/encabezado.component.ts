import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  user_type: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
        
    this.http.get<{ user_type: string }>(`${this.apiUrl}/api/user-type`, { headers: headers }).subscribe(data => {
      this.user_type = data.user_type;
      
    });


  }

}
