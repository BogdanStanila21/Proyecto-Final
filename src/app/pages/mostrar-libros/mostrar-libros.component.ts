import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';
import { Peticiones } from 'src/app/models/peticiones';
import { MostrarLibros } from "src/app/models/mostrar-libros";
import { MostrarLibrosService } from "src/app/service/mostrar-libros.service";
import { Favorites } from './../../models/favorites';
import { Data } from 'ngx-bootstrap/positioning/models';

@Component({
  selector: "app-mostrar-libros",
  templateUrl: "./mostrar-libros.component.html",
  styleUrls: ["./mostrar-libros.component.scss"],
})
export class MostrarLibrosComponent implements OnInit {
  modalRef: BsModalRef;
  public book: MostrarLibros[];
  public userbook:any;
  public fav:any;
  public datosPeticion:any;
  constructor(private modalService: BsModalService, private valor:LoginService, private api: ApisService) {}

  getValor(){
    return this.valor.getUser();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
//Mostrar libros
  mostrarLibros() {
    this.api.getLibros().subscribe((data: MostrarLibros[]) => {
      this.book = data;
      //console.log(data);
    });
  }
  mostrartype(type) {
    this.api.gettype(type).subscribe((data: MostrarLibros[]) => {
      this.book = data;
      //console.log(type);
    });
  }
  
//Crear peticion

  getBookUser(id:number){
    return this.api.getUserBook(id).subscribe((data:any)=>{
      let datos=data
      for (let i=0;i<datos.length;i++){
        if(datos[i].user_id==this.valor.getUser()[0].user_id){
          datos.splice(i,1)
        }
      }
      this.userbook=datos;
      console.log(data)
    })
  }

  postPeticion(user_idRequest:any){
    let variable = new Peticiones;
    variable.user_idRequest = user_idRequest.substr(0,1);
    variable.book_id = this.userbook[0].book_id;
    variable.user_id = this.valor.getUser()[0].user_id;
    variable.status = "Pendiente";
    let existe=false;
    console.log(existe);
    for(let i = 0;i<this.datosPeticion.length;i++){
      if((this.datosPeticion[i].user_idRequest==user_idRequest.substr(0,1)) && (this.datosPeticion[i].book_id==this.userbook[0].book_id)){
        existe=true;
      }console.log(this.datosPeticion[i].user_idRequest)
      console.log(user_idRequest.substr(0,1))
    }
    console.log(existe);
    if(!existe){
      return this.api.postPetition(variable).subscribe((data) => {
        console.log(data);
      });
    }
    
  };
  getPeticion(){
    let variable = this.valor.getUser()[0].user_id;
    return this.api.getPetition(variable).subscribe((data) => {
        this.datosPeticion = data;
        console.log(data)
      }
    );
  }

//Crear favorito

  addFavorito(bookId:number){
    let favorito=new Favorites;
    favorito.user_id=this.valor.getUser()[0].user_id
    favorito.book_id=bookId
    let existe=false;
    for(let i=0;i<this.fav.length;i++){
      if(this.fav[i].book_id==bookId){
        existe=true;
      }
    }
    if(!existe){
      return this.api.postFavorites(favorito).subscribe((data)=>{
        //console.log(data)
      })
    }
    
    
  }
  getFav(){
    let user_id=this.valor.getUser()[0].user_id 
    return this.api.getFavorites(user_id).subscribe((data)=>{
      this.fav=data;
      //console.log(data)
    }) 
  }

  ngOnInit() {
    this.mostrarLibros();
    this.getFav();
    this.getPeticion();
  }
}
