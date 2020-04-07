import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro, Libro } from './../models/registro';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private url="http://localhost:3000/user";
  private url2="http://localhost:3000/favorites";
  private url4="http://localhost:3000/mybook";
  private url5="http://localhost:3000/book";

  constructor(private http:HttpClient) { }

  postUser(nuevoUser:Registro){
    return this.http.post(this.url,nuevoUser)
  }

  getFavorites(user:any){
    return this.http.get(this.url2+"/"+user)
  }
//Mis-Libros
  getBook(user_id:number){
    return this.http.get(this.url4+"/"+user_id)
  }
  
  postBook(nuevoLibro:Libro) {
  return this.http.post(this.url5, nuevoLibro)
  }

  getModifica(book_id:number){
    return this.http.get(this.url5+"/"+book_id)
  }

  putBook(libModificado:Libro)
  {
    return this.http.put(this.url5,libModificado)
  }

  deleteBook(bookId:number)
  {
    const options={headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    body:{book_id:bookId},
    }
  return this.http.delete(this.url5, options)
  }


}



