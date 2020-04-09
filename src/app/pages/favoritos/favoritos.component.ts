import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from './../../service/apis.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { Peticiones } from 'src/app/models/peticiones';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  modalRef: BsModalRef;
  public fav:any;
  public userbook:any;
  public datosPeticion:any;
  public user:number;
  public paraPedir:boolean;
  constructor(private valor:LoginService,private api:ApisService,private modalService: BsModalService) {
    
   }

  getValor(){
    this.user=this.valor.getUser()[0].user_id;
    return this.valor.getUser();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getFav(){
    let user_id=this.valor.getUser()[0].user_id 
    console.log(JSON.stringify(this.valor.userId) )
    return this.api.getFavorites(user_id).subscribe((data)=>{
      this.fav=data;
      console.log(data)
    }) 
  }
  delFav(favId,index){
    return this.api.deleteFavorites(favId).subscribe((data)=>{
      console.log(data)
      this.fav.splice(index,1)
    })
  }
//Crear peticion

getBookUser(id:number){
  return this.api.getUserBook(id).subscribe((data)=>{
    this.userbook=data;
    console.log(data)
  })
}

postPeticion(user_idRequest:number){
  let variable = new Peticiones;
  variable.user_idRequest = user_idRequest;
  variable.book_id = this.userbook[0].book_id;
  variable.user_id = this.valor.getUser()[0].user_id;
  variable.status = "Pendiente";
  return this.api.postPetition(variable).subscribe((data) => {
      console.log(data);
    }
  )
};

getPeticion(){
  let variable = this.valor.getUser()[0].user_id;
  return this.api.getPetition(variable).subscribe((data) => {
      this.datosPeticion = data;
      console.log(data)
    }
  );
}

  ngOnInit():any {
    this.getFav();
    this.getPeticion();
  }

}
