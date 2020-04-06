import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  constructor(private valor:LoginService) { }

  getValor(){
    return this.valor.getUser();
  }


  ngOnInit(): void {
  }

}
