import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { LoginService } from './../../service/login.service';
@Component({
  selector: "app-mostrar-libros",
  templateUrl: "./mostrar-libros.component.html",
  styleUrls: ["./mostrar-libros.component.scss"]
})
export class MostrarLibrosComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private valor:LoginService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getValor(){
    return this.valor.getUser();
  }

  ngOnInit(): void {}
}
