import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { LoginService } from "./../../service/login.service";
import { ApisService } from "src/app/service/apis.service";
import { Peticiones } from "src/app/models/peticiones";
import { MostrarLibros } from "src/app/models/mostrar-libros";
import { MostrarLibrosService } from "src/app/service/mostrar-libros.service";
import { Favorites } from "./../../models/favorites";

@Component({
  selector: "app-mostrar-libros",
  templateUrl: "./mostrar-libros.component.html",
  styleUrls: ["./mostrar-libros.component.scss"],
})
export class MostrarLibrosComponent implements OnInit {
  modalRef: BsModalRef;
  public book: MostrarLibros[];
  public userbook: any;
  constructor(
    private modalService: BsModalService,
    private valor: LoginService,
    private api: ApisService
  ) {}
  filterLibro = "";
  getValor() {
    return this.valor.getUser();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  //Mostrar libros
  mostrarLibros() {
    this.api.getLibros().subscribe((data: MostrarLibros[]) => {
      this.book = data;
      console.log(data);
    });
  }
  mostrartype(type) {
    this.api.gettype(type).subscribe((data: MostrarLibros[]) => {
      this.book = data;
      console.log(type);
    });
  }

  //Crear peticion

  getBookUser(id: number) {
    return this.api.getUserBook(id).subscribe((data) => {
      this.userbook = data;
      console.log(data);
    });
  }

  postPeticion(user_idRequest: number) {
    let variable = new Peticiones();

    variable.user_idRequest = user_idRequest;
    variable.book_id = this.userbook[0].book_id;
    variable.user_id = this.valor.getUser()[0].user_id;
    variable.status = "Pendiente";
    console.log(user_idRequest);

    return this.api.postPetition(variable).subscribe((data) => {
      console.log(data);
    });
  }

  //Crear favorito

  addFavorito(bookId: number) {
    let favorito = new Favorites();
    favorito.user_id = this.valor.getUser()[0].user_id;
    favorito.book_id = bookId;
    return this.api.postFavorites(favorito).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.mostrarLibros();
  }
}
