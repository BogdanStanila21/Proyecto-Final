import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.scss']
})
export class MisLibrosComponent implements OnInit {

  constructor(private valor:LoginService) { }

  getValor(){
    return this.valor.getUser();
  }

  ngOnInit(): void {
  }

}
