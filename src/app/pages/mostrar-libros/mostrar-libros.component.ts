import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { MostrarLibros } from "src/app/models/mostrar-libros";
import { MostrarLibrosService } from "src/app/service/mostrar-libros.service";

@Component({
  selector: "app-mostrar-libros",
  templateUrl: "./mostrar-libros.component.html",
  styleUrls: ["./mostrar-libros.component.scss"],
})
export class MostrarLibrosComponent implements OnInit {
  modalRef: BsModalRef;

  public book: MostrarLibros[];
  constructor(
    private modalService: BsModalService,
    private apiMostrar: MostrarLibrosService
  ) {}
  mostrarLibros() {
    this.apiMostrar.getLibros().subscribe((data: MostrarLibros[]) => {
      this.book = data;
      console.log(data);
    });
  }
  mostrartype(type) {
    this.apiMostrar.gettype(type).subscribe((data: MostrarLibros[]) => {
      this.book = data;
      console.log(type);
    });
  }
  openModal(template: TemplateRef<any>, id: Number) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.mostrarLibros();
  }
}
