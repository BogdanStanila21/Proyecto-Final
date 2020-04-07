import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { ApisService } from 'src/app/service/apis.service';
import { Libro } from 'src/app/models/registro';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.scss']
})
export class MisLibrosComponent implements OnInit {
  public misLibros: Libro[]
  public editarLibro=new Libro  //para mostrar datos del libro en el modal de modificar

  constructor(private valor:LoginService, private Api: ApisService) { }

  getValor(){
    return this.valor.getUser();
  }

  //Mis-Libros
  
  verLibro(){
    let userLog=this.valor.getUser()[0].user_id
    return this.Api.getBook(userLog).subscribe((data:Libro[])=>
    {
      this.misLibros=data
      console.log(this.misLibros)
    })
  };

  insertarLibro(title:string,author:string,year:number,editorial:string,type:string,description:string){
    let userLog=this.valor.getUser()[0].user_id
    let book=new Libro;
    book.title=title;
    book.author=author;
    book.year=year;
    book.editorial=editorial;
    book.type=type; 
    book.description=description;
    //book.photo=photo;
    //book.available=available;
    book.user_id=userLog;
    return this.Api.postBook(book).subscribe((data)=>{
      console.log(data);
    })
  };

  modificarLibro(title:string,author:string,year:number,editorial:string,type:string,description:string){
    let modificado=new Libro;
    modificado.title=title;
    modificado.author=author;
    modificado.year=year;
    modificado.editorial=editorial;
    modificado.type=type;
    modificado.description=description;
    modificado.book_id=this.editarLibro.book_id
    return this.Api.putBook(modificado).subscribe((data)=>{
      console.log(data);
      this.verLibro();
    })
  };

  //con este método modifico el libro en el modal
  getLibro(bookId){
    return this.Api.getModifica(bookId).subscribe((data)=>{
      this.editarLibro=data[0]
      console.log(this.editarLibro)
    })
  }

  borrarLibro(bookId, indice){
    return this.Api.deleteBook(bookId).subscribe((data)=>{
      console.log(data);
      this.misLibros.splice(indice, 1)
    })
  };

  ngOnInit(){
    this.verLibro()
  };

}
