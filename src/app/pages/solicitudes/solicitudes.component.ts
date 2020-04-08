import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  public requested: any;

  constructor(private valor:LoginService,
              private api: ApisService) { }
  
  getValor(){
    // console.log(this.valor.getUser())
    return this.valor.getUser();

  }

  getRequest(){
    let user_request = this.valor.getUser()[0].user_id;
    return this.api.getRequest(user_request).subscribe((data) => {
      this.requested = data;
    });
  }

  ngOnInit() {
    this.getRequest()
  }

}
