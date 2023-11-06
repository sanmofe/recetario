import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChefService } from '../chef.service';

@Component({
  selector: 'app-chef-lista',
  templateUrl: './chef-lista.component.html',
  styleUrls: ['./chef-lista.component.css']
})
export class ChefListaComponent implements OnInit  {

  chefs = []
  idRestaurante = parseInt(this.router.snapshot.params['id']);

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private chef$: ChefService
    ){}

  ngOnInit(): void {
    this.chef$.darChefsRestaurante(this.idRestaurante).subscribe((chefs) => {
      this.chefs = chefs;
    })
  }

  crearChef(){ 
    this.routerPath.navigate(['/restaurante/' + this.idRestaurante + '/chefs/crear']);
  }

}
