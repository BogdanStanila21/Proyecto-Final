import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  public va:boolean;
  constructor(public asi:LoginService) { 
    this.va=this.asi.check
   }

  ngOnInit():void{
  }
}
