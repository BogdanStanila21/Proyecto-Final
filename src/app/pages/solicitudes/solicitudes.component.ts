import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';
import { RequestModel } from 'src/app/models/peticiones';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  public request:any
  constructor(private valor:LoginService, private api:ApisService) { }

  getValor(){
    return this.valor.getUser();
  }

  getSolicitud(){
    let id=this.valor.getUser()[0].user_id;
    return this.api.getRequest(id).subscribe((data)=>{
      this.request=data
      console.log(data)
    })
  }
  putSolicitud(id){
    let requestPut=new RequestModel;
    requestPut.status="Aceptada";
    requestPut.requested_id=id;
    return this.api.putRequest(requestPut).subscribe((data)=>{
      console.log(data)
    })
  }

  putSolicitud2(id){
    let requestPut=new RequestModel;
    requestPut.status="Rechazada";
    requestPut.requested_id=id;
    return this.api.putRequest(requestPut).subscribe((data)=>{
      console.log(data)

    })
  }

  deleteSolicitud(id){
    return this.api.deleteRequest(id).subscribe((data)=>{
      console.log(data)
    })
  }


  ngOnInit() {
    this.getSolicitud();
  }

}
