import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';
import { Peticiones } from 'src/app/models/peticiones';
@Component({
  selector: "app-mostrar-libros",
  templateUrl: "./mostrar-libros.component.html",
  styleUrls: ["./mostrar-libros.component.scss"]
})
export class MostrarLibrosComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private valor:LoginService, private api: ApisService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getValor(){
    return this.valor.getUser();
  }

  postPeticion(){
    let variable = new Peticiones;

    variable.user_idRequest = 1 //Nos lo tiene que dar el html
    variable.book_id = 1 //Nos lo tiene que dar el html
    variable.user_id = this.valor.getUser()[0].user_id;
    variable.status = "pendiente";

    return this.api.postPetition(variable).subscribe((data) => {
        console.log(data);
      }
    )
  }; //esto hay que meterlo en el modal de mostrar libros

  ngOnInit(): void {}
}
