import { Component, OnInit, TemplateRef } from '@angular/core';
//import { Libro } from 'src/app/models/registro';

import { BsModalService,BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-intercambio',
  templateUrl: './modal-intercambio.component.html',
  styleUrls: ['./modal-intercambio.component.scss']
})
export class ModalIntercambioComponent implements OnInit {

  modalRef:BsModalRef
  //public libro:Libro
  constructor(private modalService:BsModalService) { }

  openModal(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template)
  }

  /*datosModal(titulo:string,autor:string,anyo:number,editorial:string,genero:string,descripcion:string){
    this.libro=new Libro();
    this.libro.titulo=titulo;
    this.libro.autor=autor;
    this.libro.anyo=anyo;
    this.libro.editorial=editorial;
    this.libro.genero=genero;
    this.libro.descripcion=descripcion;
    console.log(this.libro)
  
  }*/
  
  ngOnInit(): void {
  }

}

