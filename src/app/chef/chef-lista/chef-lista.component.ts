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

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private chef$: ChefService
  ){}

  ngOnInit(): void {
    this.chef$.darChefs().subscribe((chefs) => {
      this.chefs = chefs;
    })
  }

  crearChef(){ 
    this.routerPath.navigate(['/chef/crear/']);
  }

  editarChef(id){
  }

  borrarChef(id){
  }

  asignarChef(id){
  }

}
