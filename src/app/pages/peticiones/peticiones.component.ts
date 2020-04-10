import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  public datosPeticion: any;

  constructor(private valor:LoginService, private api:ApisService) { }

  getValor(){
    return this.valor.getUser();
  }

  getPeticion(){
    let variable = this.valor.getUser()[0].user_id;
    return this.api.getPetition(variable).subscribe((data) => {
        this.datosPeticion = data;
        console.log(data)
      }
    );
  }

  deletePeticion(variable, indice){
    return this.api.deletePetition(variable).subscribe((data) => {
        console.log(data);
        this.datosPeticion.splice(indice, 1);
      }
    );
  }


  ngOnInit(){
    this.getPeticion();
  }
}
