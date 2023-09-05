import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
        
    this.http.get<{ user_type: string }>(`${this.apiUrl}/api/user-type`, { headers: headers }).subscribe(data => {

      this.user_type = data.user_type;
    });
  }

}
