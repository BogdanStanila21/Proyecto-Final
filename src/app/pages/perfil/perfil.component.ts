import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { Registro } from 'src/app/models/registro';
import { ApisService } from 'src/app/service/apis.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public userData: any;

  constructor(private valor:LoginService, private Api: ApisService) {this.getUser()}

  getValor(){
    return this.valor.getUser();
  }

  getUser(){
    return this.Api.getUser(this.getValor()[0].user_id).subscribe((data) =>{
      this.userData = data[0];
      console.log(this.userData)
    })
  }

  editUser(name: string, nickname: string, sex: string, place: string, password: string, email: string, aboutYou: string){
    let edit= new Registro;
    edit.name=name;
    edit.nickname=nickname;
    edit.sex=sex;
    edit.place=place;
    edit.password=password;
    edit.email=email;
    edit.aboutYou=aboutYou;
    edit.user_id= this.getValor()[0].user_id;
    console.log(edit)
    return this.Api.putUser(edit).subscribe((data) =>{
      alert("Modificado")
    })
  }

  ngOnInit(): void {
    
  }

}
