import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  constructor(private valor:LoginService) { }

  getValor(){
    return this.valor.getUser();
  }


  ngOnInit():void{
  }
}
