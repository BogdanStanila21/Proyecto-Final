import { Component } from '@angular/core';
import * as $ from 'jquery';
//import { jQuery } from 'jquery'
import { NavbarService } from './service/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private valor:NavbarService){}

  getValor(){
    return this.valor.ver()
  }

}

